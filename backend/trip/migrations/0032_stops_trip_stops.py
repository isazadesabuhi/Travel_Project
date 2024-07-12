# Generated by Django 5.0.3 on 2024-07-11 07:29

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("trip", "0031_remove_trip_stops_delete_stops"),
    ]

    operations = [
        migrations.CreateModel(
            name="Stops",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("name", models.CharField(max_length=255)),
                ("description", models.CharField(max_length=255)),
                ("location", models.CharField(max_length=255)),
            ],
        ),
        migrations.AddField(
            model_name="trip",
            name="stops",
            field=models.ManyToManyField(
                blank=True, null=True, related_name="stops", to="trip.stops"
            ),
        ),
    ]
