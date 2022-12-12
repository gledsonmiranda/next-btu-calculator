import styled from 'styled-components';

export const BtuCalculator = styled.div`
  margin-block: 2rem;

  form {
    width: 100%;
    max-width: 400px;
    padding: 0 2rem;
    margin: 0 auto 2rem;

    > div {
      margin-bottom: 1rem;

      label {
        display: block;
        margin-bottom: 0.5rem;
        font-size: 0.875rem;
      }

      select {
        width: 100%;
        display: block;
        padding: 0.25rem 0.5rem;
        font-size: 0.875rem;
        border-radius: 3px;
        outline-width: 1px;
        outline-style: solid;

        &:focus {
          outline-color: var(--purple);
          border-color: var(--purple);
        }
      }
    }
  }
`;

export const ResultContent = styled.div`
  text-align: center;
  border-top: 1px solid #fff;
  padding-top: 2rem;

  h2 {
    font-size: 1.25rem;
    margin-bottom: 0.5rem;
  }

  > div {
    max-width: 500px;
    margin: 1rem auto;
    padding: 0 0.5rem;
    text-align: left;
    display: flex;
    justify-content: space-around;

    .title {
      font-size: 1.25rem;
      font-weight: bold;
      display: block;
      color: var(--purple);
    }

    p {
      font-size: 0.875rem;
      margin-bottom: 0.5rem;
    }

    strong {
      font-size: 1rem;
      display: block;
    }
  }
`;