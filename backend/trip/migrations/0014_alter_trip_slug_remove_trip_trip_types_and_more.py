# Generated by Django 5.0.3 on 2024-07-09 14:02

import autoslug.fields
import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("trip", "0013_remove_trip_trip_type_trip_trip_types"),
    ]

    operations = [
        migrations.AlterField(
            model_name="trip",
            name="slug",
            field=autoslug.fields.AutoSlugField(
                editable=False, populate_from="title", unique_with=["title"]
            ),
        ),
        migrations.RemoveField(
            model_name="trip",
            name="trip_types",
        ),
        migrations.AddField(
            model_name="trip",
            name="trip_types",
            field=models.ForeignKey(
                blank=True,
                null=True,
                on_delete=django.db.models.deletion.CASCADE,
                related_name="types",
                to="trip.type",
            ),
        ),
    ]