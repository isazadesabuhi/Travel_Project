# Generated by Django 5.0.3 on 2024-07-08 08:48

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ("trip", "0009_remove_trip_categories_trip_categories"),
    ]

    operations = [
        migrations.RemoveField(
            model_name="category",
            name="slug",
        ),
    ]
