# Generated by Django 5.0.3 on 2024-07-11 08:14

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("trip", "0033_remove_trip_stops_delete_stops"),
    ]

    operations = [
        migrations.CreateModel(
            name="Stop",
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
                ("name", models.CharField(max_length=100)),
                ("stop_id", models.CharField(max_length=100)),
                ("description", models.TextField()),
                ("city", models.CharField(max_length=100)),
            ],
        ),
        migrations.AddField(
            model_name="trip",
            name="stops",
            field=models.ManyToManyField(blank=True, to="trip.stop"),
        ),
    ]
