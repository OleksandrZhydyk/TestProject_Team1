import dataclasses
import typing
from abc import ABC, abstractmethod
from dataclasses import dataclass
from typing import Type, ForwardRef, List
from django.db.models.manager import Manager
from django.db.models import Model

from products.DTOs import CategoriesEntity

T = Type["T"]


class ToDTOConverter(ABC):
    @abstractmethod
    def to_dto(self, data, dc: dataclass):
        pass


class FromOrmToDTO(ToDTOConverter):

    def to_dto(self, data: Model, dc: dataclass) -> dataclass:
        if not isinstance(data, Model):
            raise TypeError(f"Data must be a django.db.models.Model type not {type(data)}")
        return self._to_dataclass_obj(data, dc)

    def _to_dataclass_obj(self, data: Model, dc: dataclass) -> dataclass:
        obj_for_dataclass = {}
        for field in dataclasses.fields(dc):
            if hasattr(data, field.name):
                field_data = getattr(data, field.name)
                if hasattr(field.type, '__origin__') and field.type.__origin__ is list:
                    obj_for_dataclass[field.name] = self._get_list_of_dataclass_objects(field_data, field.type)
                elif dataclasses.is_dataclass(field.type):
                    obj_for_dataclass[field.name] = self._get_dataclass_object(field_data, field.type)
                else:
                    obj_for_dataclass[field.name] = field_data
            else:
                raise AttributeError(f"Field name '{field.name}' doesn't exist in {data}")
        return dc(**obj_for_dataclass)

    def _get_dataclass_object(self, field_data: Model, field_type: type) -> dataclass:
        return self._to_dataclass_obj(field_data, field_type)

    def _get_list_of_dataclass_objects(
        self,
        field_data: Manager,
        field_type: T
    ) -> List[dataclass]:

        obj_type = field_type.__args__[0]
        if isinstance(obj_type, ForwardRef):
            obj_type = self._get_future_object_type(obj_type)
        values_lst = []
        for orm_obj in field_data.all():
            if dataclasses.is_dataclass(obj_type):
                values_lst.append(self._to_dataclass_obj(orm_obj, obj_type))
        return values_lst

    @staticmethod
    def _get_future_object_type(obj_type):
        try:
            obj_type = globals()[obj_type.__forward_arg__]
            return obj_type
        except KeyError:
            raise ImportError(f"Import future type '{obj_type.__forward_arg__}' to the current file {__name__}")


class ToDTO:
    def __init__(self, converter: Type[ToDTOConverter]):
        self.converter = converter

    def convert_to_dto(self, data, dc: dataclasses.dataclass):
        return self.converter().to_dto(data, dc)
