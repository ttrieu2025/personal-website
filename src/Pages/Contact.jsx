import { FaLinkedin, FaInstagram, FaFacebook, FaGithub } from 'react-icons/fa';

function Contact() {
  return (
    <div className="page">
      <h1>Contact Information</h1>

      {/* Proper mailto link */}
      <p className="email">
        <a href="mailto:cattrieutruongminh@gmail.com">
          Email: cattrieutruongminh@gmail.com
        </a>
      </p>

      {/* Social icons */}
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

        <a
          href="https://github.com/ttrieu2025/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaGithub size={30} color="#b5b4b4" />
        </a>
      </div>
    </div>
  );
}

export default Contact;
