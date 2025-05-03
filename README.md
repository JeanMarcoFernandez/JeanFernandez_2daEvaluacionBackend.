Descripción del Proyecto
Este proyecto implementa un microservicio SOAP que expone un endpoint para obtener documentos almacenados en una base de datos MySQL. El servicio sigue una arquitectura de dos componentes principales:

API REST (Express.js): Proporciona acceso a los datos en formato JSON

Servicio SOAP/WSDL: Expone la funcionalidad mediante protocolo SOAP

Se explicara paso a paso lo que sera la creacion de este microservicio

Requisitos Previos
Node.js (v14 o superior)

MySQL (v5.7 o superior)

npm o yarn
Posterior tambien lo que es importar la base de datos miiga desde el github 
como archivo ZIP y exportar desde el phpmyadmin para obtener la base de datos
(NO SE OLVIDE DE DESCOMPRIMIR EL ZIP PARA DESPUES IMPORTAR PHPMYADMIN)

seguidamente el proyecto tendra una forma basicamente asi

microservicio SOAP/
├── documentos-api.js        # API REST principal
├── documentos-wsdl-service.js # Servicio SOAP/WSDL
├── package.json
└── README.md

ademas que estara el backend del proyecto para que pueda agarrar el servicio 
que se esta utilizando

Endpoints Disponibles
API REST (JSON)
	-GET /documentos - Obtiene todos los documentos vigentes
Servicio SOAP
	-Operación: obtenerDocumentos

/Consejo Principal/
se debe instalar las dependencias correspondientes. Con el siguiente codigo. se mostrara

npm install express mysql2 cors soap axios

//ACTIVACION DEL XAMPP//

se debe iniciar al xampp y aqui es la parte important, en vez de que en MYSQL
sea el puerto 3306 al 3307

1. Detener los servicios de XAMPP
	- Antes de hacer cualquier cambio:

	- Abre el Panel de Control de XAMPP

	- Detén los servicios de Apache y MySQL si están en ejecución
2. Editar el archivo de configuración my.ini
	-Navega al directorio de instalación de XAMPP (normalmente C:\xampp)

	-Abre la carpeta mysql\bin

	-Busca y edita el archivo my.ini (puedes usar Notepad++ o cualquier editor de texto)
3. Modificar la configuración del puerto
	-En el archivo my.ini, busca la línea:
		port = 3306
	-cambiarla por:
		port = 3307
Cambiar también en el archivo php.ini (opcional)
	-Si usas PHP con MySQL:

	-Ve a C:\xampp\php

	-Abre php.ini Busca:
		-mysqli.default_port = 3306
	-cambiala por:
		-mysqli.default_port = 3307
Y listo con eso ya deberia estar el cambio
//FIN DE LA ACTIVACION//

Seguidamente se mostrara lo que es el backend de microservicio en pantalla.

	EJECUCCION DE SERVICIO
1) PRIMERAMENTE SE ENTRARA DESDE LA TERMINAL AL MICROSERVICIO SOAP, CON EL SIGUIENTE CD
cd .\ProyectoTECWEB\
2) POSTERIOR CON OTRO CD  
cd .\microservices_SOAP\
3) //ESTO ES OPCIONAL// "EN CASO DE QUE QUIERA CORRER JUNTO CON EL  BACK O SI NO QUIERE CORRER"
	3a) INICIA CON UN NUEVA TERMINAL EL CD
	cd .\ProyectoTECWEB\
	3b) Y SEGUIDAMENTE
	cd .\Back\
	3c) SE CORRE EL BACKEND 
	npm run dev
4) SE INICIARA EL API REST CON TAMBIEN SERVICIO SOAP, MEDIANTE EL SIGUIENTE CODIGO
npm start 
5) DEBERIA MOSTRAR EL SIGUIENTE MENSAJE 

> microservices_soap@1.0.0 start
> concurrently "npm run start-api" "npm run start-wsdl"

[1] 
[1] > microservices_soap@1.0.0 start-wsdl
[1] > node wsdl-service.js
[1]
[0]
[0] > microservices_soap@1.0.0 start-api
[0] > node server.js
[0]
[0] API documentos ejecutándose en http://localhost:3001
[0] Conectado a MySQL - API documentos
[1] Servicio WSDL corriendo en http://localhost:3002/wsdl

***EN CASO DE NO MOSTRAR REVISE RETROCEDA A LOS ANTERIORES PASOS PARA VER EN QUE SE EQUIVOCO******

SI LE FUNCIONA, SIGA :)


		Pruebas del Servicio
En esta seccion se utilizo en este proyecto lo que es el POSTMAN, y enseguida se mostrara los pasos que se sigue para 
realizar la prueba correspondiente.

1. Se hace un New Request en el postman 
2. Crear una nueva solicitud POST
3. Posterior se coloca en la parte del URL lo siguiente: http://localhost:3002/wsdl
asi es el mismo que nos da la direccion del WSDL
4. Posterior se con los siguiente en el Header
Headers:

Key:
Content-Type
Value:
text/xml

5. Posterior a esto se ingresa al Body, despues se cambaia la seleccion none
por los que es raw, cambia la opcion en raw en vez de
texto a XML y coloca el siguinte Request SOAP: 

<?xml version="1.0"?>
<SOAP-ENV:Envelope
    xmlns:SOAP-ENV="http://schemas.xmlsoap.org/soap/envelope/"
    xmlns:tns="http://example.com/DocumentosService">
    <SOAP-ENV:Header/>
    <SOAP-ENV:Body>
        <tns:obtenerDocumentosRequest/>
    </SOAP-ENV:Body>
</SOAP-ENV:Envelope>

****este es importante asi no se olvide de colocarlo para que le enliste los documentos****

y listo se mostrar lo siguiente 
EJEMPLO

<SOAP-ENV:Envelope>
  <SOAP-ENV:Body>
    <obtenerDocumentosResponse>
      <!-- Lista de documentos -->
      <total>X</total>
    </obtenerDocumentosResponse>
  </SOAP-ENV:Body>
</SOAP-ENV:Envelope>
