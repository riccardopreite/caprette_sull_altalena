from setuptools import setup, find_packages

setup(
    name='caprette_sull_altalena',
    url='https://github.com/riccardopreite/caprette_sull_altalena',
    author='Riccardo Preite',
    version='0.1',
    license='MIT',
    description='Progetto fisica dei sistemi complessi',
    # long_description=open('README.md').read(),
    py_modules=['python'],
    install_requires=['asyncio','flask','flask_socketio','wtforms','gevent', 'gevent-websocket'],

)
