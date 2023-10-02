import { styled } from "..";

export const TransactionCompletedContainer = styled('main', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  margin: '0 auto',
  height: '41rem',

  h1: {
    fontSize: '$2xl',
    color: '$gray100'
  },

  p: {
    fontSize: '$xl',
    lineHeight: 1.4,
    color: '$gray300',
    maxWidth: '35rem',
    textAlign: 'center',
    marginTop: '2rem'
  },

  a: {
    marginTop: '5rem',
    display: 'block',
    fontSize: '$lg',
    fontWeight: 'bold',
    color: '$green500',
    transition: 'colors 0.2s ease-linear',
    textDecoration: 'none',

    '&:hover': {
      color: '$green300',
    }
  }
})

export const ImageContainer = styled('div', {
  width: '100%',
  maxWidth: '8.125rem',
  height: '9.063rem',
  background: 'linear-gradient(100deg, #1ea483 0%, #7465d4 100%)',
  borderRadius: 8,
  padding: '0.25rem',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginTop: '4rem',

  img: {
    objectFit: 'cover'
  }
})