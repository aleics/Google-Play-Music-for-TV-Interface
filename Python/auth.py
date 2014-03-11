#!/usr/bin/env python
# -*- coding: UTF-8 -*-

# enable debugging
import cgitb
cgitb.enable()

print "Content-Type: text/plain;charset=utf-8"
print

print "Hello World!"


from gmusicapi import Mobileclient
api = Mobileclient()
logged_in = api.login('al.casanovas.m@gmail.com','byvmc4fr_27109261')
# logged_in is True if login was successful

# form = cgi.FieldStorage() 
# #puedes comprobar que hay algo en la pagina o aqui 
# if form.has_key('opcion'): 
# if (form['opcion'].value == "1"): 
# #llamas a la funcion que quieras 
# if (form['opcion'].value == "2"): 
# #llamas a otra funcion que quieras 