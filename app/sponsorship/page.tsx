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
    price: 15,
    link: 'https://www.creem.io/payment/prod_611sbdPfLJxbTNlgRhcW0o',
  },
  {
    price: 20,
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
    <div className="font-mono flex items-center justify-center sm:mt-16 mt-8">
      <div className="container flex items-center justify-center flex-col">
        <h1 className="sm:text-3xl text-2xl mt-3 text-balance">
          Support the project
        </h1>
        <p className="sm:text-sm text-xs max-w-3xl text-center leading-relaxed sm:mt-4 mt-2 text-muted-foreground text-pretty">
          this is a place for those who want to go beyond a simple{' '}
          <i>thank you</i>. i&apos;m grateful for any kind of support, whether
          it&apos;s just a DM with kind words or something more. your donation
          is by no means required - this page is made just for those who asked
          for it. i am incredibly grateful for any support you choose to
          provide.
        </p>
        <p className="text-muted-foreground py-2 px-4 mt-4 sm:text-sm text-xs bg-input/50 rounded-md border border-input">
          note: the icons will always be free and open-source, regardless of
          donations
        </p>
        <div className="grid md:grid-cols-4 grid-cols-2 gap-4 mt-8 w-full max-w-2xl">
          {SUPPORT_LIST.map((item) => (
            <a
              key={item.price}
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center p-3 rounded-lg border border-input hover:bg-accent transition-colors"
            >
              <span className="font-medium">${item.price}</span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sponsorship;
