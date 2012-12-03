from fabric.api import run,env,local,settings
from fabric.operations import sudo
from fabric.context_managers import cd
import os

HOME = os.getenv("HOME")
env.user = "haradashinya"
env.hosts = ["ec2-user@54.248.226.131"]
env.key_filename = ["%s/haradashinya.pem" % HOME]


# when run cmd is success, then alert trigger terminal-notifier.
# (sudo gem install terminal-notifier)
# host_type: local,sudo

def try_cmd(host_type,cmd):
		run_cmd = host_type(cmd)
		if run_cmd.failed:
			local("terminal-notifier -message '%s'" % run_cmd.stdout)
		else:
			local("terminal-notifier -message 'success: %s'"  % cmd)

def host_type():
	run("uname -s")

# git push and run git pull in the remote machine.
def push():
	with settings(warn_only=True):
		try_cmd(local,"git push")
		with cd("/var/www/html/server"):
			try_cmd(sudo,"git pull origin master")
