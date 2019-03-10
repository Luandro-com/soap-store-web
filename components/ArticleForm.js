import React, { Component } from 'react'
import { Document, Page } from 'react-pdf'
import Input from './Input'
import Upload from './Upload'

export default class ArticleForm extends Component {
  state = {
    input: {}
  }

  handleChange = name => event => {
    this.setState({
      input: {
        ...this.state.input,
        [name]: event.target.value,
      }
    })
  }

  handleUpload = file => {
    console.log('GOT UPLOAD', file)
    this.setState({
      file
    })
  }

  onDocumentLoadSuccess = ({ numPages }) => {
    this.setState({ numPages })
  }

  getValidData = data => {
    let valid = {}
    Object.keys(data).map(obj => {
      if (obj === 'title' || obj === 'resume' || obj === 'shortDescription') {
        if (data[obj] !== null) {
          valid[obj] = data[obj]
        }
      }
    })
    return valid
  }

  componentWillMount () {
    if(this.props.initialData) {
      const valid = this.getValidData(this.props.initialData)
      this.setState({ input: valid })
    }
  }

  componentWillReceiveProps(nextProps) {
    // You don't have to do this check first, but it can help prevent an unneeded render
    if (nextProps.initialData && nextProps.initialData !== this.state.input) {
      const valid = this.getValidData(nextProps.initialData)
      this.setState({ input: valid })
    }
  }

  render() {
    const { input, file } = this.state
    const { error, onSubmit, publish, initialData } = this.props
    return (
      <form autoComplete="off" onSubmit={e => {
        e.preventDefault()
        onSubmit(input, file ? file.id : null)
      }}>
        <Input
          label="Título"
          value={input.title || ''}
          onChange={this.handleChange('title')}
        />
        <Input
          label="Descrição curta"
          value={input.shortDescription || 'Descrição breve'}
          type="textarea"
          onChange={this.handleChange('shortDescription')}
        />
        <Input
          label="Resumo"
          type="textarea"
          value={input.resume || 'Resumo do artigo'}
          onChange={this.handleChange('resume')}
        />
        <div className="uploadarea">
          {!file && <div className="imageFill" />}
          {file && <Document
            file={file.url}
            onLoadSuccess={this.onDocumentLoadSuccess}
          >
            <Page pageNumber={1} height={150} />
          </Document>}
          <Upload handleUpload={this.handleUpload} accept="application/pdf" />
        </div>
        <hr />
        <div className='action'>
          <button type="submit">
            Salvar
          </button>
          <button onClick={(e) => {
            console.log(e)
            e.preventDefault()
            publish({ variables: { articleId: initialData.id }})
              .then((res) => console.log('RES', res))
              .catch(err => console.log('err', err))
            }}
            disabled={!initialData || initialData.published}
          >
            {(!initialData || initialData.published) ? 'Publicado' : 'Publicar'}
          </button>
        </div>
        {error && <span>Erro!</span>}
        <style jsx>{`
          .action {
            display: flex;
            flex-flow: row no-wrap;
          }
          button {
            margin: 0 5px;
          }
        `}</style>
      </form>
    )
  }
}