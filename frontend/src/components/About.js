import React from 'react';

function About() {
  return (
    <section id="about" className="py-5 bg-light">
      <div className="container">
        <div className="row">
          <div className="col-md-6 offset-md-3">
            <div className="card">
              <div className="card-body">
                <h2 className="card-title">About Me</h2>
                <p className="card-text">
                  My name is Virendra Yadav, and you can reach me at{' '}
                  <a href="mailto:virendryadav453@gmail.com">virendryadav453@gmail.com</a>. I have created this website to provide an online notebook where people can store their notes.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
