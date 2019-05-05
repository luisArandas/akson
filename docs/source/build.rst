Build
============

The Akson underlying code is currently hosted on GitHub on a public repository that allows many types of action. With the potentialities of the open-source world
and the command line interfaces everyone can clone, fork and work with the Akson code. Here are some instructions on how to be able to do that.

Instructions
-------------------------------

The next commands and information will allow any user in any machine to get working with Akson in a clean and simple way. All the dependencies and libraries that are needed to get the system on the user computer running will be detailed on the major platforms.


MacOS
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

* Open the terminal

* To be able to fully experience and later edit the Akson code, the user must have some libraries the engine relies on. Node.js is one of them. One easy way to install node is using the package manager Homebrew and for that the user needs the XCode installed. To install Homebrew the user can type the following.

.. code::

      $ /usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
      $ sudo brew install node
        » user password
      // Ver isto!!!

* The current package installer of Node adds NPM which is needed for the libraries node relies on. Check both versions typing the following.


.. code::

      $ node -v
      $ npm -v




* Change the current working directory to the location where you want the cloned directory to be made. In MacOS the commands will be ls to see what there is in your directory and cd new_directory to change folder. Most probably the terminal will open the user in :~ username$.

* You will also need to have git installed. If you type the following commands, a window will prompt automatically if it is not in your system. When the terminal is opened type:

.. code::

      $ git --version
      $ cd Desktop
      $ git clone https://github.com/luisArandas/akson



.. code::

      $ Cloning into 'akson'...
      remote: Enumerating objects: 110, done.
      remote: Counting objects: 100% (110/110), done.
      remote: Compressing objects: 100% (69/69), done.
      remote: Total 6001 (delta 65), reused 81 (delta 41), pack-reused 5891
      Receiving objects: 100% (6001/6001), 21.03 MiB | 5.71 MiB/s, done.
      Resolving deltas: 100% (1583/1583), done.

* By default, npm install will fully get all modules listed as dependencies in package.json. This file is part of the main Akson code.

.. code::

      $ cd akson
      $ npm install
      $ node server.js

* The last code will run a local server on port 5000, the user can type in any browser localhost:<port>


Fork and contribute
https://help.github.com/en/articles/fork-a-repo

Windows
~~~~~~~~~~~~~~~~~~~~~~

In windows to install Node and Git the user can download the installer directly from the website. https://nodejs.org/en/download/ and https://git-scm.com/download/win After that the user can open command-prompt selecting the Start button and typing the following.

.. code::

    $ cmd
    $ cd C:\Users\username\Desktop
    $ git clone https://github.com/luisArandas/akson
    $ cd akson
    $ npm install
    $node server.js


Linux
~~~~~~~~~~~~~~~~~~~~~~

On linux the terminal work is quite similar to MacOS and as a UNIX system there are multiple similarities on the way the system behaves. If you’re on Fedora (or any closely-related RPM-based distribution, such as RHEL or CentOS), you can use dnf

.. code::

    $ sudo dnf install git-all

If you’re on a Debian-based distribution, such as Ubuntu, try apt:

.. code::

    $ sudo apt install git-all

On Linux there are multiple package managers to get node instead of downloading binaries.

.. code::

    _Android
    $ pkg install nodejs
    _Arch linux
    $ pacman -S nodejs npm
    _FreeBSD (Install via binary or compile using ports)
    $ pkg install node
    $ cd /usr/ports/www/node && make install
    _Gentoo
    $ emerge nodejs
    _NetBSD (pkgsrc tree or binary)
    $ cd /usr/pkgsrc/lang/nodejs && make install
    $ pkgin -y install nodejs
    _nvm
    $ env VERSION=`python tools/getnodeversion.py` make install DESTDIR=`nvm_version_path v$VERSION` PREFIX=""
    $ nvm use 8
    _OpenBSD
    $ /usr/ports/lang/node
    $ pkg_add node



File Architecture
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

File trees

The documentation is continually being improved. The release of version 1
