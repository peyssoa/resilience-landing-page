import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import Layout from '../components/Layout';
import Content, { HTMLContent } from '../components/Content';
import Img from 'gatsby-image';

export const AboutUsPageTemplate = ({
  title,
  content,
  contentComponent,
  banner,
}) => {
  const PageContent = contentComponent || Content;

  return (
    <>
      <div style={{ position: 'relative' }}>
        <Img
          fluid={banner.node.childImageSharp.fluid}
          css={{ top: 0, left: 0, right: 0, bottom: 0 }}
          style={{
            position: 'absolute',
            width: '100%',
            maxHeight: '100%',
            zIndex: 0,
          }}
        />
      </div>

      {/* <h2>Our objective is to help mutual aid groups wherever they are</h2> */}
      <div className="siteContent">
        <div className="siteContent-inner">
          <h1>{title}</h1>
          <PageContent className="content" content={content} />
        </div>
      </div>
    </>
  );
};

AboutUsPageTemplate.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string,
  contentComponent: PropTypes.func,
};

const AboutUsPage = ({ data }) => {
  const { markdownRemark: post } = data;
  console.log('data', data);

  return (
    <Layout>
      <AboutUsPageTemplate
        contentComponent={HTMLContent}
        title={post.frontmatter.title}
        content={post.html}
        banner={data.banner.edges[0]}
      />
    </Layout>
  );
};

AboutUsPage.propTypes = {
  data: PropTypes.object.isRequired,
};

export default AboutUsPage;

export const aboutUsPageQuery = graphql`
  query AboutUsPage($id: String!) {
    markdownRemark(id: { eq: $id }) {
      html
      frontmatter {
        title
      }
    }

    banner: allFile(
      filter: {
        sourceInstanceName: { eq: "images" }
        relativePath: { eq: "placeholde-banner.png" }
      }
    ) {
      edges {
        node {
          childImageSharp {
            fluid(maxWidth: 1440, maxHeight: 734) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }
  }
`;
