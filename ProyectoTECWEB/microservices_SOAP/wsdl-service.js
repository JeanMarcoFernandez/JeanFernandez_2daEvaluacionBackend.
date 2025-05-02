const express = require("express");
const soap = require("soap");
const axios = require("axios");
const app = express();
const port = 3002;

// Definir el servicio SOAP
const service = {
    DocumentosService: {
        DocumentosPort: {
            obtenerDocumentos: async function (args, callback) {
                try {
                    const response = await axios.get("http://localhost:3001/documentos");
                    const documentos = response.data;

                    return callback(null, {
                        documentos: documentos.map(doc => ({
                            codigo: doc.codigo,
                            tipo: doc.tipo,
                            fuente: doc.fuente,
                            descripcion: doc.descripcion,
                            relevancia: doc.relevancia,
                            anio: doc.anio,
                            enlace: doc.enlace,
                            aplicacion: doc.aplicacion,
                            creado_por: doc.creado_por_nombre
                        })),
                        total: documentos.length
                    });
                } catch (error) {
                    console.error("Error obteniendo documentos:", error);
                    return callback(error);
                }
            },
        },
    },
};

// Definir el archivo WSDL
const xml = `<definitions name="DocumentosService" xmlns="http://schemas.xmlsoap.org/wsdl/"
    xmlns:tns="http://example.com/DocumentosService" xmlns:xsd="http://www.w3.org/2001/XMLSchema"
    xmlns:soap="http://schemas.xmlsoap.org/wsdl/soap/">

    <types>
        <xsd:schema>
            <xsd:element name="obtenerDocumentosRequest" type="xsd:string"/>
            <xsd:element name="obtenerDocumentosResponse">
                <xsd:complexType>
                    <xsd:sequence>
                        <xsd:element name="documentos" minOccurs="0" maxOccurs="unbounded">
                            <xsd:complexType>
                                <xsd:sequence>
                                    <xsd:element name="codigo" type="xsd:string"/>
                                    <xsd:element name="tipo" type="xsd:string"/>
                                    <xsd:element name="fuente" type="xsd:string"/>
                                    <xsd:element name="descripcion" type="xsd:string"/>
                                    <xsd:element name="relevancia" type="xsd:string"/>
                                    <xsd:element name="anio" type="xsd:int"/>
                                    <xsd:element name="enlace" type="xsd:string"/>
                                    <xsd:element name="aplicacion" type="xsd:string"/>
                                    <xsd:element name="creado_por" type="xsd:string"/>
                                </xsd:sequence>
                            </xsd:complexType>
                        </xsd:element>
                        <xsd:element name="total" type="xsd:int"/>
                    </xsd:sequence>
                </xsd:complexType>
            </xsd:element>
        </xsd:schema>
    </types>

    <message name="obtenerDocumentosRequest">
        <part name="request" type="xsd:string"/>
    </message>
    <message name="obtenerDocumentosResponse">
        <part name="response" type="tns:obtenerDocumentosResponse"/>
    </message>
    <portType name="DocumentosPortType">
        <operation name="obtenerDocumentos">
            <input message="tns:obtenerDocumentosRequest"/>
            <output message="tns:obtenerDocumentosResponse"/>
        </operation>
    </portType>

    <binding name="DocumentosBinding" type="tns:DocumentosPortType">
        <soap:binding style="document" transport="http://schemas.xmlsoap.org/soap/http"/>
        <operation name="obtenerDocumentos">
            <soap:operation soapAction="" />
            <input>
                <soap:body use="literal"/>
            </input>
            <output>
                <soap:body use="literal"/>
            </output>
        </operation>
    </binding>

    <service name="DocumentosService">
        <port name="DocumentosPort" binding="tns:DocumentosBinding">
            <soap:address location="http://localhost:${port}/wsdl"/>
        </port>
    </service>

</definitions>`;

app.use(express.json());

app.listen(port, () => {
    console.log(`Servicio WSDL corriendo en http://localhost:${port}/wsdl`);
});

soap.listen(app, "/wsdl", service, xml);