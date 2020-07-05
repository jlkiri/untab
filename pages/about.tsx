import { Page } from "../components/Page";

const About = () => {
  return (
    <Page title="About">
      <section className="py-6 px-4 font-serif max-w-md m-auto">
        <p className="text-center text-lg">
          Have you ever had dozens of open tabs for days in your browser? Do you
          think <q>I'll just read it later</q> and then never read it?
        </p>
        <p className="text-center text-lg mt-2">
          Perhaps you do not need to manage the tabs. And you certainly should
          not bookmark something that is supposed to be read only once.
        </p>
        <p className="text-center text-lg mt-2">
          <strong>Untab</strong> helps you to solve this problem. With it, you
          can temporarily save a URL with a label and then go back to it later.
          You can close your browser and access saved URLs on any other device
          with your account.
        </p>
        <p className="text-center text-lg mt-2">
          But all of your saved URLs exist <strong>only 24 hours</strong>!
        </p>
        <p className="text-center text-lg mt-2">
          Keep your tabs clean and eliminate distractions from your browsing
          life.
        </p>
        <p className="text-center text-lg mt-4">
          By{" "}
          <a
            className="text-blue-600 underline"
            href="https://twitter.com/virtualkirill"
          >
            @virtualkirill
          </a>
        </p>
      </section>
    </Page>
  );
};

export default About;
