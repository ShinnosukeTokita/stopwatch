from django.contrib.auth import authenticate
from rest_framework.decorators import api_view
from rest_framework.response import Response

# class RegisterView(APIView):
#     @staticmethod
#     def post(request):
#         print(request.data)
#         serializer = RegisterSerializer(data=request.data)
#         if serializer.is_valid(raise_exception=True):
#             if User.objects.filter(email=serializer.validated_data['email']).exists():
#                 return Response({'error': 3}, status=HTTP_400_BAD_REQUEST)

#             try:
#                 serializer.save()
#             except:
#                 return Response({'error': 11}, status=HTTP_500_INTERNAL_SERVER_ERROR)

#             return Response(serializer.data, status=HTTP_201_CREATED)
#         return Response(serializer.errors, status=HTTP_400_BAD_REQUEST)


@api_view(["POST"])
def LoginView(request):
    email = request.data.get("email")
    password = request.data.get("password")
    user = authenticate(email=email, password=password)
    if user is not None:
        return Response({"message": "ログイン成功"})
    else:
        return Response(
            {"message": "メールアドレスまたはパスワードが異なります。"}, status=400
        )
