from fabric.api import run,env,local,settings
from fabric.operations import sudo
from fabric.context_managers import cd
import os

HOME = os.getenv("HOME")
env.user = "haradashinya"
env.hosts = ["ec2-user@54.248.226.131"]
env.key_filename = ["%s/haradashinya.pem" % HOME]

def host_type():
	run("uname -s")


# git push and run git pull in the remote machine.
def push():
	with settings(warn_only=True):
		is_local_push = local("git push &")
		if is_local_push.failed:
			local("terminal-notifier -message '%s' " % is_local_push.stdout)

		with cd("/var/www/html/server"):
				is_pull = sudo("git pull origin master ")
				if is_pull.failed:
					local("terminal-notifier -message '%s' " % is_pull.stdout)
				else:
					local("terminal-notifier -message 'succes' ")
