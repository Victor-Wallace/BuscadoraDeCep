// Logo a baixo estamos importando o React para usar funcionalidades do react.js
import React, { useState } from "react";

// Logo a baixo estamos importando o que iremos utilizar durante a aplicação
import { StyleSheet, Text, View, Alert, TextInput, TouchableOpacity, Image, Dimensions } from "react-native";


// Logo a baixo estamos importando a Api
import Api from "./Servicos/Api/Api";

import LogoCep from "../../../assets/LogoCepApp.png"


// Aqui estamos armazenando a largura e altura de tela de acordo com cada aparelho
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const Home = () => {

    // Aqui a baixo temos todas as constantes com hooks que irão nos ajudar com a atualização de estados (valores) das constantes
    const [cep, setCep] = useState("");
    const [logradouro, setLogradouro] = useState("");
    const [bairro, setBairro] = useState("");
    const [localidade, setLocalidade] = useState("");
    const [uf, setUf] = useState("");


    const varreduraDeCep = async () => {
        // Verifica se o usuario deixou em branco, caso sim, será mostrado um alerta
        if (cep == "") {
            Alert.alert("Favor verificar o cep")
        }



        // Com o retorno da Api retorna as informações, setando nos respectivos campos
        try {
            const response = await Api.get(`/${cep}/json/`);
            // Verifica se o cep é invalido
            if (response.data.erro) {
                Alert.alert('CEP não encontrado', 'Por favor, digite um CEP válido.');
            } else {
                setLogradouro(response.data.logradouro);
                setBairro(response.data.bairro);
                setLocalidade(response.data.localidade);
                setUf(response.data.uf)
            }


        }
        // Verifica erro, caso tiver erro será registrado no console (obs:não é mostrado ao usuario)
        // Porem poderiamos sim fazer que nem no verificador se foi digitado vazio aparecendo um alerta e printando o erro
        catch (erro) {
            console.log("Erro apresentado" + erro)
        }
    };


    return (
        <View style={estilos.container}>
            <View style={estilos.cabecalho}>
                <Image source={LogoCep} style={estilos.imagemCabecalho} />
                <Text style={estilos.textoCabecalho}>CepFacil</Text>
            </View>


            <View style={estilos.corpoDados}>
                <Text style={estilos.textoCorpo}>Bem vindo ao CepFacil, aqui você irá conseguir buscar os cep!</Text>
                <Text style={estilos.textoCorpo} >Experimente! Digite o Cep e em seguida pesquise</Text>
                <TextInput style={estilos.caixaCep} value={cep} onChangeText={(texto) => setCep(texto)} keyboardType="numeric" placeholder="Digite o Cep" />

                {/* Aqui temos os Input que apenas serão de leitura */}
                <TextInput style={estilos.CaixaRetorno} value={logradouro} onChangeText={(texto) => setLogradouro(texto)} placeholder="Logradouro" editable={false} />
                <TextInput style={estilos.CaixaRetorno} value={bairro} onChangeText={(texto) => setBairro(texto)} placeholder="Bairro" editable={false} />
                <TextInput style={estilos.CaixaRetorno} value={localidade} onChangeText={(texto) => setLocalidade(texto)} placeholder="Localidade" editable={false} />
                <TextInput style={estilos.CaixaRetorno} value={uf} onChangeText={(texto) => setUf(texto)} placeholder="Uf" editable={false} />

                {/* Botão que chama a função varreduraDeCep */}
                <TouchableOpacity style={estilos.botao} onPress={varreduraDeCep}>
                    <Text style={estilos.textoBotao}>Pesquisar</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};



export default Home;


// Logo a baixo irão ficar todas as estilizações da nossa tela.
// OBS: O ideal é que esteja em um arquivo separado, não será o nosso caso pois o codigo é pequeno
const estilos = StyleSheet.create({
    container: {
        flex: 1
    },
    cabecalho: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#123D6E',
        height: windowWidth * 0.2,
        borderBottomLeftRadius: windowWidth * 0.1,
        borderBottomRightRadius: windowWidth * 0.1,
        width: windowWidth
    },
    imagemCabecalho: {
        width: windowWidth * 0.15,
        height: windowWidth * 0.15
    },
    textoCabecalho: {
        fontSize: windowWidth * 0.10,
        justifyContent: 'center',
        marginLeft: windowWidth / 6,
        color: 'white',
        fontWeight: 'bold'
    },
    corpoDados: {
        alignItems: 'center'
    },
    textoCorpo: {
        marginTop: windowWidth * 0.05,
        fontSize: windowWidth * 0.05,
        textAlign: 'center'
    },
    caixaCep: {
        width: windowWidth * 0.5,
        borderWidth: windowWidth * 0.004,
        borderRadius: 8,
        height: windowHeight * 0.05,
        fontSize: 20,
        marginTop: windowWidth * 0.1,
        borderColor: 'black',
        paddingLeft:windowWidth*0.2
    },
    CaixaRetorno: {
        width: windowWidth * 0.9,
        borderWidth: windowWidth * 0.004,
        borderRadius: 8,
        height: windowHeight * 0.05,
        fontSize: 20,
        marginTop: windowWidth * 0.04,
        borderColor: 'black',
        color: "black",
        paddingLeft:windowWidth*0.2
    },
    botao: {
        width: windowWidth * 0.4,
        alignItems: 'center',
        marginTop: windowWidth * 0.08,
        height: windowWidth * 0.2,
        justifyContent: 'center',
        borderRadius: windowWidth * 0.08,
        backgroundColor: 'green'
    },
    textoBotao: {
        fontSize: windowWidth * 0.06,
        fontWeight: 'bold',
        color: '#fff'
    }


});





