from django.shortcuts import render
from django.template import RequestContext
from ws4redis.publisher import RedisPublisher
from ws4redis.redis_store import RedisMessage
from django.views.decorators.csrf import csrf_exempt
from django.http import HttpResponse
# Create your views here.
def index(request):
    request_context = RequestContext(request)
    print request_context
    return render(request, 'mychat/main.html', request_context)

@csrf_exempt
def postajax(request):
    redis_publisher = RedisPublisher(facility='foobar', broadcast = True)
    msg = request.POST.get('message')
    rip = request.META['REMOTE_ADDR']
    message = RedisMessage(rip+': '+msg)
    print msg,' from ',rip
    redis_publisher.publish_message(message)
    return HttpResponse('OK')