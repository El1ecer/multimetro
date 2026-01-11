from django.shortcuts import render

def inicio(request):
    return render(request, 'simulador/index.html')

def multimetro(request):
    return render(request, 'simulador/multimetro.html')
