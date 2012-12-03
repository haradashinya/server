from fabric.api import run,env,local,settings
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
def push():
	with settings(warn_only=True):
		local("git push")
		with cd("/var/www/html/server"):
				is_pull = sudo("git pul origin master")
				if is_pull.failed:
					local("terminal_notifier -message 'failed'")
					print "error"
				else:
					local("terminal_notifier -message 'succes'")
					print "failed"


def push():
	with cd("/var/www/html/server"):
		sudo("git pull")
