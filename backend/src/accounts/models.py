from django.db import models
from django.contrib.auth.models import User
from django.contrib.contenttypes.models import ContentType
from django.contrib.contenttypes.fields import GenericForeignKey


class Comment(models.Model):
    user = models.ForeignKey(User, on_delete=models.PROTECT, related_name='comments')
    text = models.TextField(max_length=300, editable=False)
    created_at = models.DateTimeField(auto_now_add=True, editable=False)

    content_type = models.ForeignKey(ContentType, on_delete=models.CASCADE)
    object_id = models.PositiveIntegerField()
    content_object = GenericForeignKey('content_type', 'object_id')

    def __str__(self):
        return f"{self.user} - {self.created_at}"
