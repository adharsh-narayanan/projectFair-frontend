import React, { useState } from 'react'
import Card from 'react-bootstrap/Card';
import Modal from 'react-bootstrap/Modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { faLink } from '@fortawesome/free-solid-svg-icons';
import { Col, Row } from 'react-bootstrap';
import { baseUrl } from '../services.js/baseUrl';



function ProjectCard({ projectData }) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
      <Card onClick={handleShow} className=' shadow w-100 m-3 p-2 shadow rounded' style={{}}>
        <Card.Img variant="top" src={projectData ? `${baseUrl}/uploads/${projectData.projectImage}` : null} width={'100%'} height={'200px'} />
        <Card.Body className='mt-3'>
          <Card.Title className='text-center'>{projectData.title}</Card.Title>
        </Card.Body>
      </Card>

      <Modal show={show} onHide={handleClose} size='lg'>
        <Modal.Header closeButton>
          <Modal.Title>{projectData.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col sm={12} md={6}>
              <img src={projectData ? `${baseUrl}/uploads/${projectData.projectImage}` : null} width={'100%'} height={'100%'} alt="" />

            </Col>
            <Col sm={12} md={6}>
              <h3>description</h3>
              <p>{projectData.overview}</p>
              <h3>Technologies</h3>
              <p>{projectData.language}</p>



            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer className='me-auto'>
          <Link to={projectData.github}><FontAwesomeIcon icon={faGithub} className='me-2' size='xl' /></Link>
          <Link to={projectData.website}><FontAwesomeIcon icon={faLink} className='me-2' size='xl' /></Link>

        </Modal.Footer>
      </Modal>
    </>
  )
}

export default ProjectCard