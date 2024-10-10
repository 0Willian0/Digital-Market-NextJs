import React, { useState, useEffect } from "react";
import { baseApiUrl } from "../config/global";
import axios from "axios";
import { notifyError, notifySuccess } from "../config/msgs";
import { Form, Row, Col, Button, Pagination, Table } from 'react-bootstrap';

interface Product{
    id?:number
    name?:string
    price?:string
    imageUrl?:string
    categoryId?:string
}

interface Category{
    id?:number
    name?:string
}

const ProductsAdmin: React.FC = ()=>{
    const [mode, setMode] = useState('save')
    const [product, setProduct] = useState<Product>({})
    const [products, setProducts] = useState<Product[]>([])
    const [categories, setCategories] = useState<Category[]>([])
    const [page, setPage] = useState(1)
    const [limit, setLimit] = useState(0)
    const [count, setCount] = useState(0)

    const fields=[
        {key:'id', label:'Codigo'},
        {key:'nome', label:'Nome'},
        {key:'price', label:'Preço'},
        {key:'actions', label:'Ações'}
    ]

    const loadProducts = async()=>{
        try{
            const url = `${baseApiUrl}/products?page=${page}`
            const res = await axios.get(url)
            setProducts(res.data.data || res.data)
            setCount(res.data.count)
            setLimit(res.data.limit)
        }catch(erro){
            console.log('Erro ao carregar produtos', erro)
        }
    }

    const loadCategories = async()=>{
        try{
            const url = `${baseApiUrl}/categories`
            const res = await axios.get(url)
            setCategories(res.data.categories || res.data)
        }catch(erro){
            console.log('Erro ao carregar categorias', erro)
        }
    }

    const reset = ()=>{
        setMode('save')
        setProducts([])
        loadProducts()
    }

    const save = async()=>{
        const method = product.id ? 'put' : 'post'
        const id = product.id ? `/${product.id}` : ''

        try{
            await axios[method](`${baseApiUrl}/products${id}`, product)
            notifySuccess('Produto salvo com sucesso!')
            reset()
        }catch(erro){
            notifyError('Erro ao salvar produto')
        }
    }

    const remove = async()=>{
        if(window.confirm('Tem certeza que deseja remover este Produto?')){
            try{
                axios.delete(`${baseApiUrl}/products/${product.id}`)
                notifySuccess('Produto removido com sucesso')
                reset()
            }catch(erro){
                notifyError('Erro ao remover Produto')
            }
        }
    }

    const loadProduct = async(selectedProduct: Product, mode='save')=>{
        setMode(mode)
        setProduct({...selectedProduct})
    }
    
    useEffect(() => {
        loadProducts();
        loadCategories();
      }, []);
    
    return(
        <div className="products-admin">
        <Form>
            <input type="hidden" value={product.id || ''} />
            <Row>
                <Col md="6" sm="12">
                <Form.Group controlId="product-name">
                    <Form.Label>Nome:</Form.Label>
                    <Form.Control
                    type="text"
                    value={product.name || ''}
                    onChange={(e) => setProduct({ ...product, name: e.target.value })}
                    required
                    readOnly={mode === 'remove'}
                    placeholder="Informe o Nome do Produto..."
                    />
                </Form.Group>
                </Col>
                <Col md="6" sm="12">
                <Form.Group controlId="product-price">
                    <Form.Label>Preço:</Form.Label>
                    <Form.Control
                    type="text"
                    value={product.price || ''}
                    onChange={(e) => setProduct({ ...product, price: e.target.value })}
                    required
                    readOnly={mode === 'remove'}
                    placeholder="Informe o Preco do Produto..."
                    />
                </Form.Group>
                </Col>
                <Col md="6" sm="12">
                <Form.Group controlId="product-imageUrl">
                    <Form.Label>Imagem (URL):</Form.Label>
                    <Form.Control
                    type="text"
                    value={product.imageUrl || ''}
                    onChange={(e) => setProduct({ ...product, imageUrl: e.target.value })}
                    required
                    readOnly={mode === 'remove'}
                    placeholder="Informe a URL da Imagem..."
                    />
                </Form.Group>
                </Col>
                <Col md="6" sm="12">
                <Form.Group controlId="product-categoryId">
                    <Form.Label>Categoria:</Form.Label>
                    <Form.Select
                    value={product.categoryId || ''}
                    onChange={(e) => setProduct({ ...product, categoryId: e.target.value })}
                    aria-label="Selecionar categoria"
                    disabled={mode === 'remove'}
                    >
                    <option value="">Selecione...</option>
                    {categories.map((cat) => (
                        <option key={cat.id} value={cat.id}>
                        {cat.name}
                        </option>
                    ))}
                    </Form.Select>
            </Form.Group>
                </Col>
            </Row>
            <br/>
            <Row>
                <Col xs="12">
                {mode === 'save' && (
                    <Button variant="success" onClick={save}>
                    Salvar
                    </Button>
                )}
                {mode === 'remove' && (
                    <Button variant="danger" onClick={remove}>
                    Excluir
                    </Button>
                )}
                <Button className="ml-1" onClick={reset}>
                    Cancelar
                </Button>
                </Col>
            </Row>
            </Form>
            <hr/>
            <Table hover striped>
            <thead>
                <tr>
                {fields.map(field => (
                    <th key={field.key}>{field.label}</th>
                ))}
                </tr>
            </thead>
            <tbody>
            {products.length > 0 ?(products.map(product => (
                <tr key={product.id}>
                <td>{product.id}</td>
                <td>{product.name}</td>
                <td>{product.price}</td>
                <td>
                    <Button
                    variant="warning"
                    onClick={() => loadProduct(product)}
                    className="mr-1"
                    >
                    <i className="fa fa-pencil" aria-hidden="true" />
                    </Button>
                    <Button
                    variant="danger"
                    onClick={() => loadProduct(product, 'remove')}
                    className="mr-3"
                    >
                    <i className="fa fa-trash" aria-hidden="true" />
                    </Button>
                </td>
                </tr>
                ))): (
                    <tr>
                        <td colSpan={fields.length}>Nenhum dado disponível</td>
                    </tr>
                )}
            </tbody>
            </Table>

            <Pagination>
                {Array.from({ length: Math.ceil(count / limit) }, (_, i) => (
                    <Pagination.Item
                    key={i + 1}
                    active={i + 1 === page}
                    onClick={() => setPage(i + 1)}
                    >
                    {i + 1}
                    </Pagination.Item>
                ))}
            </Pagination>
        </div>
    )
}

export default ProductsAdmin