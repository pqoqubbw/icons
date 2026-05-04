import { AmountSelector } from "@/components/sponsorship/amount-selector";
import { SUPPORT_LIST } from "@/lib/data/support-list";
import { createMetadata } from "@/seo/metadata";

export const metadata = createMetadata({
  title: "Sponsor lucide-animated",
  description:
    "Support the development of lucide-animated - free open-source animated React icons library. Your sponsorship helps maintain and grow this MIT licensed project.",
  canonical: "/sponsorship",
  ogTitle: "Sponsor lucide-animated | Support Open Source",
});

const Sponsorship = () => {
  return (
    <section className="mx-auto mt-[60px] flex w-full flex-col items-center justify-center overflow-hidden pb-20">
      <h1 className="px-4 text-center font-sans text-[32px] min-[640px]:text-[42px]">
        Support the project
      </h1>
      <p className="mt-5 max-w-[582px] px-4 text-center font-mono text-secondary text-sm">
        this is a place for those who want to go beyond a simple thank you.
        I&apos;m grateful for any kind of support, whether it&apos;s just a DM
        with kind words or something more. your donation is by no means required
        - this page is made just for those who asked for it. I am incredibly
        grateful for any support you choose to provide
        <br />
        <br />
        Choose amount you want to support the project with:
      </p>

      <AmountSelector amounts={SUPPORT_LIST} />
    </section>
  );
};

export default Sponsorship;
