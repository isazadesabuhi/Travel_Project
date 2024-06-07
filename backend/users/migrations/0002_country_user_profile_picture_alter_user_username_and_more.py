# Generated by Django 5.0.3 on 2024-06-02 10:06

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("users", "0001_initial"),
    ]

    operations = [
        migrations.CreateModel(
            name="Country",
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
                ("name", models.CharField(max_length=255, unique=True)),
            ],
        ),
        migrations.AddField(
            model_name="user",
            name="profile_picture",
            field=models.ImageField(blank=True, null=True, upload_to="profile_pics"),
        ),
        migrations.AlterField(
            model_name="user",
            name="username",
            field=models.CharField(max_length=255, unique=True),
        ),
        migrations.AddField(
            model_name="user",
            name="countries_visited",
            field=models.ManyToManyField(
                blank=True, related_name="countries", to="users.country"
            ),
        ),
    ]