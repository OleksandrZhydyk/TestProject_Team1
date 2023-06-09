# Generated by Django 4.2.1 on 2023-05-20 19:10

from django.conf import settings
import django.core.validators
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('products', '0005_alter_category_options'),
    ]

    operations = [
        migrations.CreateModel(
            name='Order',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('ordered_at', models.DateTimeField(blank=True, null=True)),
                ('is_ordered', models.BooleanField(default=False)),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, related_name='orders', to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='OrderItem',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=128)),
                ('color', models.CharField(default='Білий', max_length=25)),
                ('size', models.CharField(max_length=5)),
                ('sex_and_age', models.CharField(choices=[('Чоловіки', 'Чоловіки'), ('Жінки', 'Жінки'), ('Хлопчики', 'Хлопчики'), ('Дівчатка', 'Дівчатка')], default='Жінки', max_length=15)),
                ('season', models.CharField(choices=[('Осінь/Зима', 'Осінь/Зима'), ('Весна/Літо', 'Весна/Літо')], default='Весна/Літо', max_length=15)),
                ('description', models.TextField(max_length=1000)),
                ('price', models.FloatField(validators=[django.core.validators.MinValueValidator(limit_value=0.01, message='Price has to be greater then 0.01.')])),
                ('quantity', models.PositiveSmallIntegerField()),
                ('category', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='products.category')),
                ('order', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='items', to='orders.order')),
            ],
        ),
    ]
