# Generated by Django 5.0.3 on 2024-07-06 12:59

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ("trip", "0005_remove_trip_category_trip_categories"),
    ]

    operations = [
        migrations.RemoveField(
            model_name="trip",
            name="categories",
        ),
        migrations.DeleteModel(
            name="Category",
        ),
    ]
