import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet } from 'react-native';

export default function App() {
  const [products, setProducts] = useState([]);
  const [sales, setSales] = useState([]);
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [price, setPrice] = useState('');

  // Adiciona um produto ao estoque
  const addProduct = () => {
    setProducts([...products, { name, quantity: parseInt(quantity), price: parseFloat(price) }]);
    setName('');
    setQuantity('');
    setPrice('');
  };

  // Registra uma venda e atualiza o estoque
  const registerSale = (productName, soldQuantity) => {
    const updatedProducts = products.map(product => {
      if (product.name === productName) {
        return { ...product, quantity: product.quantity - soldQuantity };
      }
      return product;
    });

    setProducts(updatedProducts);
    setSales([...sales, { productName, soldQuantity, date: new Date().toLocaleString() }]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Confeitaria - Controle de Vendas e Estoque</Text>

      {/* Seção de Cadastro de Produtos */}
      <View>
        <Text style={styles.sectionTitle}>Cadastro de Produtos</Text>
        <TextInput
          placeholder="Nome do produto"
          value={name}
          onChangeText={(text) => setName(text)}
          style={styles.input}
        />
        <TextInput
          placeholder="Quantidade"
          value={quantity}
          onChangeText={(text) => setQuantity(text)}
          keyboardType="numeric"
          style={styles.input}
        />
        <TextInput
          placeholder="Preço"
          value={price}
          onChangeText={(text) => setPrice(text)}
          keyboardType="numeric"
          style={styles.input}
        />
        <Button title="Cadastrar Produto" onPress={addProduct} />
      </View>

      {/* Seção de Vendas */}
      <View>
        <Text style={styles.sectionTitle}>Registro de Vendas</Text>
        <FlatList
          data={products}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View>
              <Text>
                {item.name} - Estoque: {item.quantity} - Preço: R${item.price.toFixed(2)}
              </Text>
              {item.quantity > 0 ? (
                <View>
                  <TextInput
                    placeholder="Quantidade vendida"
                    onChangeText={(text) => setQuantity(text)}
                    keyboardType="numeric"
                    style={styles.input}
                  />
                  <Button
                    title="Registrar Venda"
                    onPress={() => registerSale(item.name, parseInt(quantity))}
                  />
                </View>
              ) : (
                <Text>Produto esgotado</Text>
              )}
            </View>
          )}
        />
      </View>

      {/* Seção de Relatório */}
      <View>
        <Text style={styles.sectionTitle}>Relatório de Vendas e Estoque</Text>
        <Text>Vendas Registradas</Text>
        <FlatList
          data={sales}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <Text>
              Produto: {item.productName} | Quantidade: {item.soldQuantity} | Data: {item.date}
            </Text>
          )}
        />

        <Text>Estoque Atual</Text>
        <FlatList
          data={products}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <Text>
              Produto: {item.name} | Quantidade em Estoque: {item.quantity} | Preço: R${item.price.toFixed(2)}
            </Text>
          )}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
  },
});
