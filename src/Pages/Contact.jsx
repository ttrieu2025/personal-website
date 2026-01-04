import { FaLinkedin, FaInstagram, FaFacebook} from 'react-icons/fa'
import GradientText from '../components/GradientText'

function Contact() {
  return (
    <>
            <h1> Contact Information  </h1> 
          <p
            href="mailto:cat.trieu.truongminh@gmail.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            Email: cattrieutruongminh@gmail.com  <br/>
          </p>

          <p
            href="mailto:cat.trieu.truongminh@gmail.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            Tel: +1 (778) 636-2241
          </p>

    
        <div className="social-links">

          <a
            href="https://www.linkedin.com/in/mc-trieu-truong"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaLinkedin size={30} color="#b5b4b4" />
          </a>

          <a
            href="https://www.instagram.com/c.trevort_14/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaInstagram size={30} color="#b5b4b4" />
          </a>

          <a
            href="https://www.facebook.com/cattrieu.truongminh.3/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaFacebook size={30} color="#b5b4b4" />
          </a>

        </div>
        </>
  )
}

export default Contact