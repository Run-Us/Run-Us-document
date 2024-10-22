/*
 * Modified by hughesgoon on October 20, 2024.
 * Original project: dyte-io/docs.
 * Changes:
 * - Converted the original JSX files to TSX format.
 * - Remove information about dyte-io
 * - Customize content for our documentation
 */

import React from "react";
import Layout from "@theme/Layout";
import Head from "@docusaurus/Head";
import BrowserOnly from "@docusaurus/BrowserOnly";
import { useHistory } from "@docusaurus/router";
import clsx from "clsx";

import useBreakpoint from "../../lib/useBreakpoint";
import SectionsMenu from "../../components/SectionsMenu";

function APIElement({ layout = "sidebar", currentVersion = "v0.2" }) {
  return (
    <BrowserOnly fallback={<p>API 문서를 불러오는데 실패하였습니다.</p>}>
      {() => {
        // eslint-disable-next-line no-undef, @typescript-eslint/no-var-requires
        const { API } = require("@stoplight/elements");

        return (
          <div className={clsx("elements-container", layout)}>
            <API
              className="stacked"
              apiDescriptionUrl={`/api/openapi-${currentVersion}.yaml`}
              basePath="/"
              router="hash"
              layout={layout}
              hideExport
            />
          </div>
        );
      }}
    </BrowserOnly>
  );
}

export default function Home() {
  const router = useHistory();

  const location = router.location;
  const size = useBreakpoint();

  const url = new URL(
    location.pathname + location.search,
    window.location.origin
  );

  const currentVersion = url.searchParams.get("v") || "v0.2";

  return (
    <Layout
      title={`API ${currentVersion === "v0.2" ? "v0.2 " : ""}Documentation`}
      description="RunUS의 Web API 문서입니다. 단순한 달리기를 넘어, 러너들이 서로 격려하고 함께 발전할 수 있도록 함께 해주세요."
      noFooter
      wrapperClassName="api-reference"
    >
      <Head>
        {/* Load styles for Stoplight Elements */}
        <title>Web API 가이드 | RunUS</title>
        <link rel="preload" href="/assets/css/elements.min.css" as="style" />
        <link rel="stylesheet" href="/assets/css/elements.min.css" />
        <meta
          name="description"
          content="RunUS의 Web API 문서입니다. 단순한 달리기를 넘어, 러너들이 서로 격려하고 함께 발전할 수 있도록 함께 해주세요."
        ></meta>
      </Head>

      <div className="flex flex-col items-center justify-center gap-4 border-b py-12 text-sm lg:hidden">
        이 페이지는 가로 1012px 이상인 데스크톱 환경에서 가장 잘 보입니다.
      </div>

      <div className="header">
        <h1 className="mb-0 flex items-center gap-2 text-sm font-semibold lg:text-lg">
          RunUS Web API
        </h1>
        <div className="aside">
          <SectionsMenu
            defaultValue={currentVersion}
            values={[{ name: "v0.2", docId: "v0.2" }]}
            onValueChange={(version) => {
              router.push(`/api/http?v=${version}`);
            }}
            className="compact"
          />
        </div>
      </div>
      <APIElement
        layout={size === "sm" ? "stacked" : "sidebar"}
        currentVersion={currentVersion}
      />
    </Layout>
  );
}
