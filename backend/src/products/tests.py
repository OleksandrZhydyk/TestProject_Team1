import dataclasses
from typing import List, ForwardRef
from unittest import TestCase
from dataclasses import dataclass
from unittest.mock import Mock, MagicMock, patch
from django.db.models import Model
from django.db.models.query import QuerySet

from products.convertors_to_dto import FromOrmToDTO


class TestFromOrmToDTO(TestCase):
    @dataclass
    class TestDataclass:
        id: int
        name: str

    def setUp(self):
        self.converter = FromOrmToDTO()

    def test_to_dto(self):
        @dataclass
        class InnerTestDataclass:
            id: int
            name: str

        @dataclass
        class OuterTestDataclass:
            id: int
            dc: List[InnerTestDataclass]

        mock_model = Mock(spec=Model)
        mock_related_manager = MagicMock()
        mock_related_manager.all.return_value = self.get_list_db_model_objects()
        mock_model.id = 1
        mock_model.dc = mock_related_manager
        result = self.converter.to_dto(mock_model, OuterTestDataclass)

        self.assertIsInstance(result, OuterTestDataclass)
        self.assertEqual(result.id, 1)
        self.assertEqual(result.dc[1], InnerTestDataclass(id=2, name="second"))

    def test_error_to_dto_incorrect_data_type(self):

        queryset = Mock(spec=QuerySet)

        with self.assertRaises(TypeError):
            self.converter.to_dto({'test': "dict"}, self.TestDataclass)

        with self.assertRaises(TypeError):
            self.converter.to_dto(queryset, self.TestDataclass)

    def test_error_to_dto_incorrect_dataclass_field_name(self):
        @dataclass
        class InnerTestDataclass:
            id: int
            name: str

        @dataclass
        class OuterTestDataclass:
            non_existed_field_name: int
            dc: List[InnerTestDataclass]

        mock_model = Mock(spec=Model)
        mock_related_manager = MagicMock()
        mock_related_manager.all.return_value = self.get_list_db_model_objects()
        mock_model.id = 1
        mock_model.dc = mock_related_manager

        with self.assertRaises(AttributeError):
            self.converter.to_dto(mock_model, OuterTestDataclass)

    def test__to_dataclass_obj_db_related_objects(self):
        @dataclass
        class InnerTestDataclass:
            id: int
            name: str

        @dataclass
        class OuterTestDataclass:
            dc: List[InnerTestDataclass]

        mock_model = Mock(spec=Model)
        mock_related_manager = MagicMock()
        mock_related_manager.all.return_value = self.get_list_db_model_objects()
        mock_model.dc = mock_related_manager
        result = self.converter.to_dto(mock_model, OuterTestDataclass)

        self.assertIsInstance(result, OuterTestDataclass)
        self.assertIsInstance(result.dc, list)
        self.assertEqual(result.dc[1], InnerTestDataclass(id=2, name="second"))

    def test__to_dataclass_obj_db_related_object(self):
        @dataclass
        class InnerTestDataclass:
            id: int
            name: str

        @dataclass
        class OuterTestDataclass:
            dc: InnerTestDataclass

        mock_model = Mock(spec=Model)
        mock_model.dc = self.get_db_model_object()
        result = self.converter.to_dto(mock_model, OuterTestDataclass)

        self.assertIsInstance(result, OuterTestDataclass)
        self.assertEqual(result.dc, InnerTestDataclass(id=1, name="first"))

    def test__to_dataclass_obj_python_builtin_types(self):
        model = self.get_db_model_object()
        result = self.converter._get_dataclass_object(model, self.TestDataclass)

        self.assertEqual(result, self.TestDataclass(id=1, name="first"))

    def test__get_dataclass_object(self):

        model = self.get_db_model_object()
        result = self.converter._get_dataclass_object(model, self.TestDataclass)

        self.assertEqual(result, self.TestDataclass(id=1, name="first"))

    def test__get_list_dataclass_object(self):

        mock_related_manager = MagicMock()
        mock_related_manager.all.return_value = self.get_list_db_model_objects()
        result = self.converter._get_list_of_dataclass_objects(mock_related_manager, List[self.TestDataclass])

        self.assertIsInstance(result, list)
        self.assertIsInstance(result[0], self.TestDataclass)
        self.assertEqual(result[1], self.TestDataclass(id=2, name="second"))

    def test_error_get_future_object_type(self):

        forward_ref = Mock(spec=ForwardRef)
        forward_ref.__forward_arg__ = 'TestDataclass'

        with self.assertRaises(ImportError):
            self.converter._get_future_object_type(forward_ref)

    @staticmethod
    def get_db_model_object():
        model = Mock(spec=Model)
        model.id = 1
        model.name = "first"
        return model

    @staticmethod
    def get_list_db_model_objects():
        model_instance_1 = Mock(spec=Model)
        model_instance_1.id = 1
        model_instance_1.name = "first"
        model_instance_2 = Mock(spec=Model)
        model_instance_2.id = 2
        model_instance_2.name = "second"

        return [model_instance_1, model_instance_2]
    # def test__get_future_object_type(self):
    #
    #     class TestDataclass:
    #         id: int
    #         name: str
    #
    #
    #     # Patch the global variable
    #     with patch('products.convertors_to_dto.TestDataclass', TestDataclass):
    #
    #         forward_ref = MagicMock(spec=ForwardRef)
    #         forward_ref.__forward_arg__ = 'TestDataclass'
    #
    #         result = self.converter._get_future_object_type(forward_ref)
    #         print(result)
