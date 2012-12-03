from fabric.api import run , env
from fabric.api import local
from fabric.operations import sudo
from fabric.context_managers import cd
import os


HOME = os.getenv("HOME")
env.user = "haradashinya"
env.hosts = ["ec2-user@54.248.226.131"]
env.key_filename = ["%s/haradashinya.pem"%HOME]

def host_type():
	run("uname -s")

def update():
	with cd("/var/www/html/server"):
		sudo("git pull")

def deploy():
	local("sudo git push")
	with cd("/var/www/html/server"):
		sudo("git pull origin master")
		sudo("pwd")



def push():
	with cd("/var/www/html/server"):
		sudo("git pull")
