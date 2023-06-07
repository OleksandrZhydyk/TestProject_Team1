import dataclasses
from abc import ABC, abstractmethod
from typing import Type

from django.db.models import QuerySet


class ToDTOConverter(ABC):
    @abstractmethod
    def to_dto_entity(self, data, dataclass):
        pass


class FromOrmToDTO(ToDTOConverter):

    def to_dto_entity(self, data: QuerySet, dc: dataclasses.dataclass) -> dataclasses.dataclass:
        dataclass_obj = self._to_dataclass_obj(data, dc)
        print(dataclass_obj, sep='\n')
        return dataclass_obj

    def _to_dataclass_obj(self, data: QuerySet, dc: dataclasses.dataclass):
        if isinstance(data, dict):
            return data
        obj_for_dataclass = {}
        for field in dataclasses.fields(dc):
            field_data = getattr(data, field.name)
            if field_data is not None:
                if hasattr(field.type, '__origin__') and field.type.__origin__ is list:
                    obj_for_dataclass[field.name] = self._list_of_dataclass_type(field_data, field.type)
                elif dataclasses.is_dataclass(field.type):
                    obj_for_dataclass[field.name] = self._dataclass_type(field_data, field.type)
                else:
                    obj_for_dataclass[field.name] = self._primitive_type(field_data)
        return dc(**obj_for_dataclass)

    @staticmethod
    def _primitive_type(field_data):
        return field_data

    def _dataclass_type(self, field_data, field_type: type):
        return self._to_dataclass_obj(field_data, field_type)

    def _list_of_dataclass_type(self, field_data, field_type):
        obj_type = field_type.__args__[0]
        values_lst = []
        for orm_obj in field_data.all():
            if dataclasses.is_dataclass(obj_type):
                values_lst.append(self._to_dataclass_obj(orm_obj, obj_type))
        return values_lst


class ToDTO:
    def __init__(self, converter: Type[ToDTOConverter]):
        self.converter = converter

    def convert_to_dto(self, data, dc: dataclasses.dataclass):
        return self.converter().to_dto_entity(data, dc)
