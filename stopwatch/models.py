import hashlib
from datetime import timedelta

from django.contrib.auth.models import AbstractUser
from django.db import models
from django.utils import timezone


class User(AbstractUser):
    email = models.EmailField(max_length=255, unique=True)
    username = None
    first_name = None
    last_name = None
    date_joined = None
    groups = None
    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = []


def in_30_days():
    return timezone.now() + timedelta(days=30)


class AccessToken(models.Model):
    # ひもづくユーザー
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    # アクセストークン(max_lengthが40に設定されている理由は、トークンはsha1でハッシュ化した文字列を設定するため)
    token = models.CharField(max_length=40)
    # アクセス日時
    access_datetime = models.DateTimeField(default=in_30_days)

    def __str__(self):
        # メールアドレスとアクセス日時、トークンが見えるように設定
        dt = timezone.localtime(self.access_datetime).strftime("%Y/%m/%d %H:%M:%S")
        return self.user.email + "(" + dt + ") - " + self.token

    @staticmethod
    def create(user: User):
        # ユーザの既存のトークンを取得
        if AccessToken.objects.filter(user=user).exists():
            # トークンがすでに存在している場合は削除
            AccessToken.objects.get(user=user).delete()

        # トークン作成（UserID + Password + システム日付のハッシュ値とする）
        dt = timezone.now()
        str = user.email + user.password + dt.strftime("%Y%m%d%H%M%S%f")
        hash = hashlib.sha1(str.encode("utf-8")).hexdigest()

        # トークンをDBに追加
        token = AccessToken.objects.create(user=user, token=hash, access_datetime=dt)

        return token
