# Generated by Django 5.0.3 on 2024-07-09 12:37

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("trip", "0012_trip_trip_type"),
    ]

    operations = [
        migrations.RemoveField(
            model_name="trip",
            name="trip_type",
        ),
        migrations.AddField(
            model_name="trip",
            name="trip_types",
            field=models.ManyToManyField(
                blank=True, null=True, related_name="types", to="trip.type"
            ),
        ),
    ]
