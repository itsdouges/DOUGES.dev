/** @jsxImportSource @emotion/react */
import { Fragment } from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import { css } from '@emotion/react';
import { token } from '@atlaskit/tokens';
import pkg from '../package.json';
import Card from 'design-system/card';
import Blog from 'components/blog';
import Heading from 'design-system/heading';
import Stack from 'design-system/stack';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import Section from 'design-system/section';
import A from 'design-system/link';
import type { BlogMeta } from 'types/types';
import SignUp from 'components/sign-up';
import { getAllBlogPosts } from 'lib/blog';
import Text from 'design-system/text';
import Grid from 'design-system/grid';

const LatestBlogContent = dynamic(
  () => import('./blog/write-eslint-rules-that-developers-love.mdx')
);

const heroStyles = css({
  height: '40vh',
  minHeight: 450,
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'column',
  justifyContent: 'center',
  textAlign: 'center',
  borderBottom: `2px solid ${token('color.border.neutral')}`,
});

const Home: NextPage<{ latest: BlogMeta; moreBlogs: BlogMeta[] }> = ({ latest, moreBlogs }) => {
  return (
    <Fragment>
      <Head>
        <title>
          {pkg.name} · {pkg.description}
        </title>
        <meta name="description" content={pkg.description} />
        <meta property="og:title" content={pkg.name} />
        <meta property="og:description" content={pkg.description} />
        <meta property="og:url" content={`https://${pkg.name}`} />
        {latest.heroImage && (
          <meta property="og:image" content={`https://${pkg.name}${latest.heroImage.src}`} />
        )}
        {latest.heroImage && (
          <meta property="og:image:height" content={`${latest.heroImage.height}`} />
        )}
        {latest.heroImage && (
          <meta property="og:image:width" content={`${latest.heroImage.width}`} />
        )}
        {latest.heroImage && (
          <meta name="twitter:image" content={`https://${pkg.name}${latest.heroImage.src}`} />
        )}
      </Head>

      <main>
        <div css={heroStyles}>
          <Section>
            <Stack gap={1}>
              <Heading level={0}>douges&#8203;.dev</Heading>
              <Text color="medium">
                <span
                  dangerouslySetInnerHTML={{
                    __html: pkg.description.replace(
                      'Michael Dougall',
                      '<a data-splitbee-event="External Link" data-splitbee-event-type="twitter" href="https://twitter.com/itsdouges">Michael Dougall</a>'
                    ),
                  }}
                />
              </Text>
            </Stack>
          </Section>
        </div>

        <Section isSeparated>
          <Blog {...latest}>
            <LatestBlogContent />
          </Blog>
        </Section>

        {moreBlogs.length > 0 && (
          <Section isSeparated isSunken>
            <Stack gap={2}>
              <Heading level={2}>There&apos;s more where that came from</Heading>
              <Grid columns={2} gap={4}>
                {moreBlogs.map((blog, index) => (
                  <Link key={index} href={`/blog/${blog.slug}`} passHref>
                    <A data-splitbee-event="More Blog">
                      <Card title={blog.title} secondary={blog.blurb} heroImage={blog.heroImage} />
                    </A>
                  </Link>
                ))}
              </Grid>
            </Stack>
          </Section>
        )}

        <Section isSeparated isSunken={moreBlogs.length === 0}>
          <SignUp />
        </Section>
      </main>
    </Fragment>
  );
};

export async function getStaticProps() {
  return getAllBlogPosts();
}

export default Home;
