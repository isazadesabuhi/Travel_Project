# Generated by Django 5.0.3 on 2024-07-10 14:28

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ("trip", "0027_trip_inclusions"),
    ]

    operations = [
        migrations.RemoveField(
            model_name="trip",
            name="inclusions",
        ),
    ]
