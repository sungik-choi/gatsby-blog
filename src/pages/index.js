import React from 'react';
import { Link, graphql } from 'gatsby';
import styled from 'styled-components';

import Layout from 'components/layout/layout';
import SEO from '../components/seo';
import Card from 'components/card';
import { Image, ThumbnailWrapper } from 'components/centeredImg';

import convertToKorDate from 'utils/convertToKorDate';

const Home = ({ data }) => {
  return (
    <Layout>
      <SEO title="Home" />
      <Main>
        <section>
          <Content>
            <Grid>
              {data.allMarkdownRemark.edges.map(({ node }) => {
                const { title, desc, date, tag, thumbnail } = node.frontmatter;
                const korDate = convertToKorDate(date);
                const ariaLabel = `${title} - ${tag} - Posted on ${korDate}`;
                return (
                  <List key={node.id}>
                    <Link to={node.fields.slug} aria-label={ariaLabel}>
                      <Card
                        thumbnail={thumbnail}
                        tag={tag}
                        title={title}
                        desc={desc}
                        date={date}
                        korDate={korDate}
                      />
                    </Link>
                  </List>
                );
              })}
            </Grid>
          </Content>
        </section>
      </Main>
    </Layout>
  );
};

const Main = styled.main`
  min-width: ${({ theme }) => theme.minWidth};
  ${({ theme }) =>
    `min-height: calc(100vh - ${theme.navHeight} - ${theme.footerHeight})`};
  background-color: ${({ theme }) => theme.color.gray1};
`;

const Content = styled.div`
  box-sizing: content-box;
  padding-top: ${({ theme }) => theme.gridGap.lg};
  width: 87.5%;
  margin: 0 auto;

  @media (min-width: ${({ theme }) => theme.device.lg}) {
    width: 100%;
    max-width: ${({ theme }) => theme.width};
    padding-top: ${({ theme }) => theme.sizing.lg};
  }
`;

const Grid = styled.ul`
  display: grid;
  grid-gap: ${({ theme }) => theme.gridGap.lg};
  grid-template-columns: repeat(2, 1fr);
  list-style: none;

  & > li {
    margin-bottom: 0;
  }

  @media (min-width: ${({ theme }) => theme.device.lg}) {
    grid-gap: ${({ theme }) => theme.gridGap.xl};
  }
`;

const List = styled.li`
  box-sizing: border-box;
  grid-column: span 2;

  @media (min-width: ${({ theme }) => theme.device.lg}) {
    grid-column: span 1;

    &:hover ${ThumbnailWrapper}::after {
      opacity: 1;
    }

    &:hover ${Image} {
      transform: translate(-50%, -50%) scale(1.05);
    }
  }
`;

export const query = graphql`
  query {
    allMarkdownRemark(sort: { fields: frontmatter___date, order: DESC }) {
      totalCount
      edges {
        node {
          id
          frontmatter {
            title
            tag
            date(formatString: "YYYY-MM-DD")
            desc
            thumbnail
          }
          fields {
            slug
          }
          excerpt
        }
      }
    }
  }
`;

export default Home;
