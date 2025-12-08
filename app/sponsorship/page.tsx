import { AmountSelector } from '@/components/sponsorship/amount-selector';

const SUPPORT_LIST = [
  {
    price: 5,
    link: 'https://www.creem.io/payment/prod_1G8q9yoWDEMUuMaYXjdMnk',
  },
  {
    price: 10,
    link: 'https://www.creem.io/payment/prod_2fx79crTzRv8c6DCBiYSt4',
  },
  {
    price: 25,
    link: 'https://www.creem.io/payment/prod_5GxIWzOFwl7JvFxtWV1x1O',
  },
  {
    price: 50,
    link: 'https://www.creem.io/payment/prod_4wOq9XhPSA4jIt1EBdVEcR',
  },
  {
    price: 100,
    link: 'https://www.creem.io/payment/prod_2BWHaJvZZUTYQONb5xpQIR',
  },
  {
    price: 200,
    link: 'https://www.creem.io/payment/prod_49xErbm5DmJJZDBW7lA2lO',
  },
  {
    price: 500,
    link: 'https://www.creem.io/payment/prod_2HSF38lRw7yMNy8Lb9f3p1',
  },
];

const Sponsorship = () => {
  return (
    <section className="mx-auto mt-[60px] flex w-full flex-col items-center justify-center">
      <h1 className="px-4 text-center font-sans text-[32px] min-[640px]:text-[42px]">
        Support the project
      </h1>
      <p className="text-secondary mt-5 max-w-[582px] px-4 text-center font-mono text-sm">
        this is a place for those who want to go beyond a simple thank you. I'm
        grateful for any kind of support, whether it's just a DM with kind words
        or something more. your donation is by no means required - this page is
        made just for those who asked for it. I am incredibly grateful for any
        support you choose to provide
        <br />
        <br />
        Choose amount you want to support the project with:
      </p>

      <AmountSelector amounts={SUPPORT_LIST} />
    </section>
  );
};

export { SUPPORT_LIST };
export default Sponsorship;
