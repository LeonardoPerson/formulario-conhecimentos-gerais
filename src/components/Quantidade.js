import React from 'react';
import { useResult } from '../providers/Store';
import { Form, Row, Col } from 'react-bootstrap';

const Quantidade = () => {
  const { quantidade, setQuantidade } = useResult();

  const isNumber = (n) => {
    return !isNaN(parseFloat(n)) && isFinite(n);
  }

  const mascaraCampoTexto = (numero) => {
    if(isNumber(numero)){
      return numero
    }else{
      return numero.replace(/([^\d])+/gim, '');
    }
  }

  const handleChange = (evt) => {
    evt.preventDefault();
    setQuantidade(evt.target.value)
  }


  //Nesse componente podemos mandar as respostas das questões para o localStorage
  return (
    <div>
      <div>Questões de conhecimentos gerais</div>
      <Form>
        <Row>
          <Col md={2} sm={4} xs={6}>
            <Form.Group>
              <Form.Label>Escolha uma quantidade de questões.</Form.Label>
              <Form.Control type="text" onChange={handleChange} value={mascaraCampoTexto(quantidade)}/>
            </Form.Group>
          </Col>
        </Row>
      </Form>
    </div>
  );
}

export default Quantidade;
