from fabric.api import run,env,local
from fabric.operations import sudo
from fabric.context_managers import cd
import os

HOME = os.getenv("HOME")
env.user = "haradashinya"
env.hosts = ["ec2-user@54.248.226.131"]
env.key_filename = ["%s/haradashinya.pem"%HOME]

def host_type():
	run("uname -s")

# remote update
def update():
	with cd("/var/www/html/server"):
		sudo("git pull")

# git push and run git pull in the remote machine.
def deploy():
	local("git push")
	with cd("/var/www/html/server"):
		try:
			is_pull = sudo("git pul origin master")
			local("terminal-notifier -message 'deploy success'")
		except Exception as e:
			local("terminal-notifier -message 'deploy failed'")

def push():
	with cd("/var/www/html/server"):
		sudo("git pull")
