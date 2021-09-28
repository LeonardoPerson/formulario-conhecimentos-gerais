import React, { useState } from 'react';
import { useResult } from '../providers/Store';
import { Redirect } from 'react-router-dom';
import { Form, Row, Col } from 'react-bootstrap';
import { useFormik } from "formik";
import * as yup from "yup";

const Quantidade = () => {
  const { quantidade, setQuantidade } = useResult();
  const [prosseguir, setProsseguir] = useState(false);
  const limiteDigitos = 2;

  console.log(quantidade)

  const isNumber = (n) => {
    return !isNaN(parseFloat(n)) && isFinite(n);
  }

  const mascaraCampoTexto = (numero) => {
    if (isNumber(numero)) {
      return numero
    } else {
      return numero.replace(/([^\d])+/gim, '');
    }
  }

  const initialValues = {
    quantidade: quantidade
  }

  const validationSchema = {
    quantidade: yup.number()
      .typeError('')
      .min(1, "Escolha pelo menos uma questão")
      .max(50, "Existem 50 questões no máximo")
      .required("Escolha uma quantidade")
  }

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: yup.object().shape(validationSchema),

    onSubmit: (values) => {
      setQuantidade(values.quantidade);
      setProsseguir(true);
    }
  })


  return (
    <div className="app">
      <div>General knowledge questions</div>
      <Form onSubmit={formik.handleSubmit}>
        <Row>
          <Col md={12} sm={12} xs={12}>
            <Form.Group className="inputNumber">
              <Form.Label>Choose a number of questions.</Form.Label>
              <Col md={6} sm={6} xs={8}>
                <Form.Control
                  type="text"
                  name="quantidade"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={mascaraCampoTexto(formik.values.quantidade)}
                  maxLength={limiteDigitos} />
              </Col>
              <div className="errorContainer">
              {formik.errors.quantidade && formik.touched.quantidade ? (
                <div className="errorMessage">{formik.errors.quantidade}</div>
              ) : null}
              </div>
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col md={12} sm={12} xs={12}> 
            <button type="submit" >
              Confirm
            </button>
          </Col>
        </Row>
      </Form>
      {prosseguir && <Redirect to="/inicia-teste" />}
    </div>
  );
}

export default Quantidade;
