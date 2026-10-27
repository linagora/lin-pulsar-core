# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

### [0.1.1](https://github.com/linagora/lin-pulsar-core/compare/v0.1.0...v0.1.1) (2026-10-26)


### Bug Fixes

* npm publication due to pnpm 11 ([0b2a870](https://github.com/linagora/lin-pulsar-core/commit/0b2a8702b82a134ae45a03fbeb7c1a7869714cd7))

## [0.1.0](https://github.com/linagora/lin-pulsar-core/compare/v0.0.109...v0.1.0) (2026-10-23)


### ⚠ BREAKING CHANGES

* the package is now published as @linagora/lin-pulsar-core.
All Linid*/useLinid*/LINID_* exports are renamed to LinPulsar*/useLinPulsar*/LIN_PULSAR_*,
Pinia store ids are renamed, build outputs are now lin-pulsar-core.{es,umd}.js,
and license references move from LinID Identity Manager to LinOpenFactory.

### Features

* rename library to @linagora/lin-pulsar-core ([193bbcc](https://github.com/linagora/lin-pulsar-core/commit/193bbcc45b65c0f5d43bcd7e86601f3a5e3bde18))


### Bug Fixes

* add missing sections in types-and-interfaces file ([1b39fb5](https://github.com/linagora/lin-pulsar-core/commit/1b39fb50d83f769a8505fb00941558bc9f9e5f3a))
* grant issues write permission for PR comments ([bf1e08c](https://github.com/linagora/lin-pulsar-core/commit/bf1e08c672b7068e15e7c9a1f5e38bd628f79495))
* log module and zone files that fail to load with an HTTP error ([4ffad67](https://github.com/linagora/lin-pulsar-core/commit/4ffad675176016f280cd2a757e0d4405fec39ebd))
* use bash in CI containers, grant comment permissions and run CodeQL with node ([4a411bb](https://github.com/linagora/lin-pulsar-core/commit/4a411bbc99881b180d336a25072d05b2d811bcdc))

### [0.0.109](https://github.com/linagora/linid-im-front-corelib/compare/v0.0.108...v0.0.109) (2026-10-16)


### Features

* read the class and style attributes from the design configuration ([6027526](https://github.com/linagora/linid-im-front-corelib/commit/602752683256710432626e7c19945f1b99a3eedd))

### [0.0.108](https://github.com/linagora/linid-im-front-corelib/compare/v0.0.107...v0.0.108) (2026-10-16)


### Bug Fixes

* sonar errors ([4ba2bc1](https://github.com/linagora/linid-im-front-corelib/commit/4ba2bc1c6fb4435bbf205f001655761762b41733))

### [0.0.107](https://github.com/linagora/linid-im-front-corelib/compare/v0.0.106...v0.0.107) (2026-10-15)


### Features

* support local components in module configuration ([b460eab](https://github.com/linagora/linid-im-front-corelib/commit/b460eabb25acc04d687e8fd38632aa31daa3700d))

### [0.0.106](https://github.com/linagora/linid-im-front-corelib/compare/v0.0.105...v0.0.106) (2026-10-08)


### Features

* add dynamic label resolution for filter values ([eff876b](https://github.com/linagora/linid-im-front-corelib/commit/eff876b85ced20eefefeb3e14e65f5d8d95b491c))

### [0.0.105](https://github.com/linagora/linid-im-front-corelib/compare/v0.0.104...v0.0.105) (2026-10-06)


### Features

* add selectable to TreeNodeType ([f43779f](https://github.com/linagora/linid-im-front-corelib/commit/f43779fb25efa36af89322a3f24c5d3ef2853204))
* add Tree to AttributeInputType ([8c80ef9](https://github.com/linagora/linid-im-front-corelib/commit/8c80ef9485f4686eda5664743e9da3a7341671b3))

### [0.0.104](https://github.com/linagora/linid-im-front-corelib/compare/v0.0.103...v0.0.104) (2026-09-24)

### [0.0.103](https://github.com/linagora/linid-im-front-corelib/compare/v0.0.102...v0.0.103) (2026-09-23)


### Features

* add File to AttributeInputType ([a6d0b84](https://github.com/linagora/linid-im-front-corelib/commit/a6d0b848a20b0cef3c1993791d8967db2309572f))
* add maxFileSize and allowedExtensions validators ([f0d4327](https://github.com/linagora/linid-im-front-corelib/commit/f0d43276a8af7fa877bb2872c74e72f0368ea6b1))

### [0.0.102](https://github.com/linagora/linid-im-front-corelib/compare/v0.0.101...v0.0.102) (2026-09-21)


### Features

* add hasItem to nunjucks function ([cacc2d0](https://github.com/linagora/linid-im-front-corelib/commit/cacc2d039ed563b97a3dbfdf229abf4e4614d109))

### [0.0.101](https://github.com/linagora/linid-im-front-corelib/compare/v0.0.100...v0.0.101) (2026-09-21)


### Features

* update email validation to allow empty values ([b2fbd52](https://github.com/linagora/linid-im-front-corelib/commit/b2fbd528125aa6ce5aaf1def088fc2356547177d))

### [0.0.100](https://github.com/linagora/linid-im-front-corelib/compare/v0.0.99...v0.0.100) (2026-09-16)


### Features

* add q-card-section ui design ([12e117e](https://github.com/linagora/linid-im-front-corelib/commit/12e117ec0a90731509ba6bae2579bb4853842f2e))

### [0.0.99](https://github.com/linagora/linid-im-front-corelib/compare/v0.0.98...v0.0.99) (2026-09-16)


### Bug Fixes

* sort property of Pagination interface follows Spring Data convention ([2a10abe](https://github.com/linagora/linid-im-front-corelib/commit/2a10abef72b0bd2b8a966da7001e592e81ec5872))
* toQuasarPagination preserve sort state ([2b7f31a](https://github.com/linagora/linid-im-front-corelib/commit/2b7f31a4fc67c1aa05d377cba1a7f7433ca9219f))

### [0.0.98](https://github.com/linagora/linid-im-front-corelib/compare/v0.0.97...v0.0.98) (2026-09-11)


### Features

* add job next-version-hint into CI ([63fcd28](https://github.com/linagora/linid-im-front-corelib/commit/63fcd28d59c6cbabfb23cf7298a7fc1b15aca11f))
* use i18n key instead of resolved label in NavigationMenuItem ([e794d5a](https://github.com/linagora/linid-im-front-corelib/commit/e794d5a4c2d897310f1206a952bb90b5bf7bca41))

### [0.0.97](https://github.com/linagora/linid-im-front-corelib/compare/v0.0.96...v0.0.97) (2026-09-11)

### [0.0.96](https://github.com/linagora/linid-im-front-corelib/compare/v0.0.95...v0.0.96) (2026-09-04)


### Features

* add formatDate function ([fec7df7](https://github.com/linagora/linid-im-front-corelib/commit/fec7df7a0a8cd8a6e5faffec6f4c139a9c0bf778))
* add quasarDate constant file ([6703ba0](https://github.com/linagora/linid-im-front-corelib/commit/6703ba0f10fad97401d4a91a7aa3d6234d120f30))

### [0.0.95](https://github.com/linagora/linid-im-front-corelib/compare/v0.0.94...v0.0.95) (2026-09-04)


### Features

* support loading extra zones during module federation initialization ([4cdb860](https://github.com/linagora/linid-im-front-corelib/commit/4cdb860f39d5284afd5ba58a1a8025d3c7cb2315))

### [0.0.94](https://github.com/linagora/linid-im-front-corelib/compare/v0.0.93...v0.0.94) (2026-09-01)


### Features

* add renderString function to useNunjucks for single template string rendering ([c33f287](https://github.com/linagora/linid-im-front-corelib/commit/c33f28711b4abc0fb93781e3e22bf9fea0e84760))

### [0.0.93](https://github.com/linagora/linid-im-front-corelib/compare/v0.0.92...v0.0.93) (2026-09-01)


### Features

* enhance useNunjucks composable with direct object resolution ([1b84046](https://github.com/linagora/linid-im-front-corelib/commit/1b8404630cb8d4551b7f818673ba385c385b5284))

### [0.0.92](https://github.com/linagora/linid-im-front-corelib/compare/v0.0.91...v0.0.92) (2026-08-27)


### Features

* add createModulePageLifecycle factory ([fc5895a](https://github.com/linagora/linid-im-front-corelib/commit/fc5895a3649b5aa74248bb1e484c41722890553d))
* add linidModuleFederation host orchestration ([4926d1a](https://github.com/linagora/linid-im-front-corelib/commit/4926d1a98a6bddc2e3feaa1f4f9bf95c76712db8))

### [0.0.91](https://github.com/linagora/linid-im-front-corelib/compare/v0.0.90...v0.0.91) (2026-08-07)


### Features

* add nested value helpers to object service ([7027f1a](https://github.com/linagora/linid-im-front-corelib/commit/7027f1a29aba4e6506327c75d39f463cc190f2a5))

### [0.0.90](https://github.com/linagora/linid-im-front-corelib/compare/v0.0.89...v0.0.90) (2026-08-05)

### [0.0.89](https://github.com/linagora/linid-im-front-corelib/compare/v0.0.88...v0.0.89) (2026-08-04)


### Features

* add zone component registry ([7840feb](https://github.com/linagora/linid-im-front-corelib/commit/7840feb4a7eaae67300d9ada7ae5d0416f5a96ce))
* reference zone components by name ([b7c7675](https://github.com/linagora/linid-im-front-corelib/commit/b7c76752b63cc3f5fbd86e2e5a25454a1675e13b))

### [0.0.88](https://github.com/linagora/linid-im-front-corelib/compare/v0.0.87...v0.0.88) (2026-08-03)


### Features

* implement value formatting composable ([07ea82f](https://github.com/linagora/linid-im-front-corelib/commit/07ea82fd742fa68fc4e3c1d477c814876e71c449))

### [0.0.87](https://github.com/linagora/linid-im-front-corelib/compare/v0.0.86...v0.0.87) (2026-08-03)


### Features

* add hasZoneEntries action to LinidZoneStore ([7739f77](https://github.com/linagora/linid-im-front-corelib/commit/7739f77ed2084b89d538468db5869d388d98502b))

### [0.0.86](https://github.com/linagora/linid-im-front-corelib/compare/v0.0.85...v0.0.86) (2026-07-29)


### Features

* add draggable ui design ([4bae171](https://github.com/linagora/linid-im-front-corelib/commit/4bae171df7a533cee1c5f556c455244698251e20))
* add q-scroll-area ui design ([890abda](https://github.com/linagora/linid-im-front-corelib/commit/890abda8a313eacc08c3759447c51f4ba024643d))


### Bug Fixes

* update QOptionGroup type to QOptionGroupProps in uiDesign.ts ([d672a0b](https://github.com/linagora/linid-im-front-corelib/commit/d672a0b6c4edc342a387cde7056d1ea73ff5a7d1))

### [0.0.85](https://github.com/linagora/linid-im-front-corelib/compare/v0.0.84...v0.0.85) (2026-07-28)


### Features

* add common mapper functions ([5716e84](https://github.com/linagora/linid-im-front-corelib/commit/5716e849995aff6f7830198bd785f51e0a609785))

### [0.0.84](https://github.com/linagora/linid-im-front-corelib/compare/v0.0.83...v0.0.84) (2026-07-24)


### Features

* support direct Vue components in zone entries ([2b074fb](https://github.com/linagora/linid-im-front-corelib/commit/2b074fb43fa91b319d160595741a433d92dc8fc5))

### [0.0.83](https://github.com/linagora/linid-im-front-corelib/compare/v0.0.82...v0.0.83) (2026-07-20)


### Features

* **core:** add i18n state and actions to UI store ([d967bcd](https://github.com/linagora/linid-im-front-corelib/commit/d967bcd5196ba3412b364c5f3e5457589847c44d))
* **core:** move locale management into scoped i18n and configure eslint ([e3a048d](https://github.com/linagora/linid-im-front-corelib/commit/e3a048df3e6f60632c083987bed46ca419cdc26b))

### [0.0.82](https://github.com/linagora/linid-im-front-corelib/compare/v0.0.81...v0.0.82) (2026-07-08)


### Features

* update dependencies ([7e8f346](https://github.com/linagora/linid-im-front-corelib/commit/7e8f346c3678ef64f90b7fe81888a5f17a385ffc))


### Bug Fixes

* fix i18n type due to update ([d2f6f78](https://github.com/linagora/linid-im-front-corelib/commit/d2f6f787f1a0b2550359d275eef4ae3060d9797b))

### [0.0.81](https://github.com/linagora/linid-im-front-corelib/compare/v0.0.80...v0.0.81) (2026-07-02)


### Bug Fixes

* missing value property on linid filter set type ([c843138](https://github.com/linagora/linid-im-front-corelib/commit/c843138e3f351a0a89b5220fc89d10830ddb6d92))

### [0.0.80](https://github.com/linagora/linid-im-front-corelib/compare/v0.0.79...v0.0.80) (2026-07-02)


### Features

* add type for favorite in user-preference ([86054a9](https://github.com/linagora/linid-im-front-corelib/commit/86054a93572eea18ea054159c724415499a52ed9))

### [0.0.79](https://github.com/linagora/linid-im-front-corelib/compare/v0.0.78...v0.0.79) (2026-06-26)


### Features

* add composable and store for user preference ([78d3ade](https://github.com/linagora/linid-im-front-corelib/commit/78d3adecc9e21e4bd35fe42c62a26096649a0ac4))
* add id to LinidFilterSet ([480baeb](https://github.com/linagora/linid-im-front-corelib/commit/480baebb6bf6a20bb632cdd7f0793811626b4de5))

### [0.0.78](https://github.com/linagora/linid-im-front-corelib/compare/v0.0.77...v0.0.78) (2026-06-24)


### Features

* add q-option-group ui design ([8948d28](https://github.com/linagora/linid-im-front-corelib/commit/8948d280d0e111034fedfc5556c79a1d9d8a2771))

### [0.0.77](https://github.com/linagora/linid-im-front-corelib/compare/v0.0.76...v0.0.77) (2026-06-23)


### Features

* add LinidFilterSet class for favorite search saving ([90aec91](https://github.com/linagora/linid-im-front-corelib/commit/90aec91da66080f0e246f9c672c030fceca247af)), closes [#105](https://github.com/linagora/linid-im-front-corelib/issues/105)


### Bug Fixes

* handle invalid input string for fromString method of LinidFilter and LinidFilterValue ([4b5083e](https://github.com/linagora/linid-im-front-corelib/commit/4b5083e45874be3fbc6dff656c3618b93371e965))

### [0.0.76](https://github.com/linagora/linid-im-front-corelib/compare/v0.0.75...v0.0.76) (2026-06-23)


### Features

* add q-separator ui design ([0bd6933](https://github.com/linagora/linid-im-front-corelib/commit/0bd6933366b79460abd4528e31c0da0e11104d51))

### [0.0.75](https://github.com/linagora/linid-im-front-corelib/compare/v0.0.74...v0.0.75) (2026-06-23)


### Features

* add qfield ui design ([359e878](https://github.com/linagora/linid-im-front-corelib/commit/359e878f13ab607cbabc783be0662a5f8c2fe4bb))

### [0.0.74](https://github.com/linagora/linid-im-front-corelib/compare/v0.0.73...v0.0.74) (2026-06-22)


### Features

* add q-chip design ([9e964e3](https://github.com/linagora/linid-im-front-corelib/commit/9e964e36726b545368c24ead5b375b823957d8ba))

### [0.0.73](https://github.com/linagora/linid-im-front-corelib/compare/v0.0.72...v0.0.73) (2026-06-22)


### Features

* add composable to manage filters in url ([2a1f752](https://github.com/linagora/linid-im-front-corelib/commit/2a1f752db91dcc03d96a54d1a004b96c7386d933))


### Bug Fixes

* toString of LinidFilter to return value of query-parameter ([0a04e80](https://github.com/linagora/linid-im-front-corelib/commit/0a04e80be0952f306e95ea5db9c2a0d06cbbe2cf))

### [0.0.72](https://github.com/linagora/linid-im-front-corelib/compare/v0.0.71...v0.0.72) (2026-06-22)


### Features

* add LinidFilter type and LinidFilterValue parsing class ([0f70b08](https://github.com/linagora/linid-im-front-corelib/commit/0f70b08c151e5a11916a08dfda603f8e19a6df90)), closes [#102](https://github.com/linagora/linid-im-front-corelib/issues/102)

### [0.0.71](https://github.com/linagora/linid-im-front-corelib/compare/v0.0.70...v0.0.71) (2026-06-19)


### Features

* add LinidQSplitterProps in LinidQComponentProps ([5d7407d](https://github.com/linagora/linid-im-front-corelib/commit/5d7407d0a1c36f7230e7ae603aaa1b46bac5b3b4))
* add qcheckbox ui design ([28da8d0](https://github.com/linagora/linid-im-front-corelib/commit/28da8d05a35d397c83ac702efc924833421441b6))

### [0.0.70](https://github.com/linagora/linid-im-front-corelib/compare/v0.0.69...v0.0.70) (2026-06-19)


### Features

* add qlayout ui design ([5bef659](https://github.com/linagora/linid-im-front-corelib/commit/5bef6597b90a8b2c6acf9654cbd25a966e6f7c8a))

### [0.0.69](https://github.com/linagora/linid-im-front-corelib/compare/v0.0.68...v0.0.69) (2026-06-18)


### Features

* improve module configuration with lifecycle routes and i18N remote ([8aedcf3](https://github.com/linagora/linid-im-front-corelib/commit/8aedcf3860c308044eff8d348f18e0aaa2c805fd))

### [0.0.68](https://github.com/linagora/linid-im-front-corelib/compare/v0.0.67...v0.0.68) (2026-06-16)


### Features

* add Email input type ([e4298b2](https://github.com/linagora/linid-im-front-corelib/commit/e4298b2b1b4f6f3089641bd491eb5de7f7649273))


### Bug Fixes

* rename TextArea input type to PascalCase ([31939cf](https://github.com/linagora/linid-im-front-corelib/commit/31939cf05fb2027692717bf57f81c9af06a784c9))

### [0.0.67](https://github.com/linagora/linid-im-front-corelib/compare/v0.0.66...v0.0.67) (2026-06-05)


### Features

* **dialog:** make dialog draggable ([6844299](https://github.com/linagora/linid-im-front-corelib/commit/684429963085f81533b9dd186d26803544a282c5))

### [0.0.66](https://github.com/linagora/linid-im-front-corelib/compare/v0.0.65...v0.0.66) (2026-05-22)


### Features

* add modelValue to splitter design ([4b86943](https://github.com/linagora/linid-im-front-corelib/commit/4b869433774ce1143b6d210bbd6bea5defaf0b2c))

### [0.0.65](https://github.com/linagora/linid-im-front-corelib/compare/v0.0.64...v0.0.65) (2026-05-21)


### Features

* add date range validators (afterDate, beforeDate, fromDate, upToDate) ([a5448d0](https://github.com/linagora/linid-im-front-corelib/commit/a5448d019c65981d412e1e280ca9a8f04fca4a56))
* add dayjsService to let consumers inject their configured dayjs instance ([427dbcf](https://github.com/linagora/linid-im-front-corelib/commit/427dbcfa47f89fe1e4554c46b3ef3b990c9c9337))
* add TextArea as input type ([55433b2](https://github.com/linagora/linid-im-front-corelib/commit/55433b2c050767517edb1cbe70c4fb9c4db14b31))
* add useDayjs composable with strict date parsing and min/max helpers ([cc176a2](https://github.com/linagora/linid-im-front-corelib/commit/cc176a2af729012cbdf9aac86d8d76a20d85fcc4))
* add useNunjucks composable to recursively render string properties of objects ([5cab23c](https://github.com/linagora/linid-im-front-corelib/commit/5cab23c4107062f928dccff2d011ff9b86d42873))
* add useQuasarDate composable with Quasar-compatible date formatting ([d8416c1](https://github.com/linagora/linid-im-front-corelib/commit/d8416c1fedf10c6d51a6a0b9317fe0f48116751e))

### [0.0.64](https://github.com/linagora/linid-im-front-corelib/compare/v0.0.63...v0.0.64) (2026-05-13)


### Features

* add qsplitter ui design ([dc818cc](https://github.com/linagora/linid-im-front-corelib/commit/dc818cc1ce26e0af0ba87e2335089abb79dad876))

### [0.0.63](https://github.com/linagora/linid-im-front-corelib/compare/v0.0.62...v0.0.63) (2026-05-12)

### [0.0.62](https://github.com/linagora/linid-im-front-corelib/compare/v0.0.61...v0.0.62) (2026-05-12)


### Features

* add support for email validator inside useQuasarRules handles ([fc30d27](https://github.com/linagora/linid-im-front-corelib/commit/fc30d2752339b9e3399af768ff14958e35438a28))
* make validateFromApi conditional on hasValidations ([9736885](https://github.com/linagora/linid-im-front-corelib/commit/9736885caa6a1beb88f1a9435b2e1db947d105bd))

### [0.0.61](https://github.com/linagora/linid-im-front-corelib/compare/v0.0.60...v0.0.61) (2026-05-06)


### Features

* add generic MenuItem and DropdownClickPayload types ([4b9fbb2](https://github.com/linagora/linid-im-front-corelib/commit/4b9fbb23accf4b1aab70fe3f04066245d9336d7f))

### [0.0.60](https://github.com/linagora/linid-im-front-corelib/compare/v0.0.59...v0.0.60) (2026-05-04)


### Features

* add TreeNodeType and extraActions for nodeType ([464f651](https://github.com/linagora/linid-im-front-corelib/commit/464f651f74330377dfdcb0ed88fc93f5713b1585))

### [0.0.59](https://github.com/linagora/linid-im-front-corelib/compare/v0.0.58...v0.0.59) (2026-05-04)


### Features

* simplify useQuasarFieldValidation to only depend on i18nScope ([69ce3dd](https://github.com/linagora/linid-im-front-corelib/commit/69ce3dd8ad86b3a723a1b8ca4b57687fda4f84ca))
* validDate and dateNotInPast rules to field validation composables ([f3dcaa6](https://github.com/linagora/linid-im-front-corelib/commit/f3dcaa69846b923e7d391283c5144792b87f0aa0))

### [0.0.58](https://github.com/linagora/linid-im-front-corelib/compare/v0.0.57...v0.0.58) (2026-04-28)


### Features

* add qtree ui design ([8f6c11d](https://github.com/linagora/linid-im-front-corelib/commit/8f6c11d1876fd0c7c7ec72d80aa606e83e246719))
* add useTree composable and TreeNode types ([c1afa30](https://github.com/linagora/linid-im-front-corelib/commit/c1afa300287dfbeff3a4f6856c113cc7d55fd5c3))

### [0.0.57](https://github.com/linagora/linid-im-front-corelib/compare/v0.0.56...v0.0.57) (2026-04-24)


### Features

* add ui-design for q-menu ([287407e](https://github.com/linagora/linid-im-front-corelib/commit/287407e125b57385590fd1a9c82775703430e822))

### [0.0.56](https://github.com/linagora/linid-im-front-corelib/compare/v0.0.55...v0.0.56) (2026-04-23)


### Features

* simplify useFieldValidation ([410d02f](https://github.com/linagora/linid-im-front-corelib/commit/410d02f030f183ef516a5c62540e3b7a8c100d36))

### [0.0.55](https://github.com/linagora/linid-im-front-corelib/compare/v0.0.54...v0.0.55) (2026-04-23)


### Features

* add email rule to field validation composables ([3915809](https://github.com/linagora/linid-im-front-corelib/commit/39158091b3ef292cd6a4f01920c453c4f0029b0e))
* add ui-design for q-banner ([e691fb6](https://github.com/linagora/linid-im-front-corelib/commit/e691fb6fa1952fa4a633920d2aeed890568bda07))

### [0.0.54](https://github.com/linagora/linid-im-front-corelib/compare/v0.0.53...v0.0.54) (2026-04-10)


### Features

* add LinidUserState in pinia store ([cbe1af0](https://github.com/linagora/linid-im-front-corelib/commit/cbe1af060b9b21508a43960d746bcde5d24cc679))

### [0.0.53](https://github.com/linagora/linid-im-front-corelib/compare/v0.0.52...v0.0.53) (2026-04-02)


### Features

* add optional name field to LinidRoute type ([3fec67e](https://github.com/linagora/linid-im-front-corelib/commit/3fec67ef3f4e35c1493306b9ad00ba539f8435b1))

### [0.0.52](https://github.com/linagora/linid-im-front-corelib/compare/v0.0.51...v0.0.52) (2026-03-17)

### [0.0.51](https://github.com/linagora/linid-im-front-corelib/compare/v0.0.50...v0.0.51) (2026-03-06)


### Features

* add "unique" field validator ([2c1fad1](https://github.com/linagora/linid-im-front-corelib/commit/2c1fad13e1c17f2d8743325c74f80c6b2616f672))
* add deepEqualUnordered method in objectService ([0d1922c](https://github.com/linagora/linid-im-front-corelib/commit/0d1922cd120b050bfd78e6f56487e07ec20c4d12))

### [0.0.50](https://github.com/linagora/linid-im-front-corelib/compare/v0.0.49...v0.0.50) (2026-03-06)


### Features

* add service setting and exposing nunjucks instance ([46a7797](https://github.com/linagora/linid-im-front-corelib/commit/46a77974362636ab5aaf20850115881be82461d9))

### [0.0.49](https://github.com/linagora/linid-im-front-corelib/compare/v0.0.48...v0.0.49) (2026-03-02)


### Bug Fixes

* make zone attributes override components attributes ([6745295](https://github.com/linagora/linid-im-front-corelib/commit/6745295c1fb2d5749d20a1383377437ecf979d49))

### [0.0.48](https://github.com/linagora/linid-im-front-corelib/compare/v0.0.47...v0.0.48) (2026-02-26)


### Features

* forward $attrs to ui elements rendered in a zone ([9691dc2](https://github.com/linagora/linid-im-front-corelib/commit/9691dc22604ee4a8eccc3fa8d960d63902a6db92))

### [0.0.47](https://github.com/linagora/linid-im-front-corelib/compare/v0.0.46...v0.0.47) (2026-02-25)


### Features

* add standardized interface for cross-module component zones configuration ([d113395](https://github.com/linagora/linid-im-front-corelib/commit/d1133950a6228dd17a509543141ba5ccb4558196)), closes [#76](https://github.com/linagora/linid-im-front-corelib/issues/76)

### [0.0.46](https://github.com/linagora/linid-im-front-corelib/compare/v0.0.45...v0.0.46) (2026-02-23)


### Features

* add q-form design ([9dcd005](https://github.com/linagora/linid-im-front-corelib/commit/9dcd0056863f6cc8db3779ad278c160fcef23fa3))

### [0.0.45](https://github.com/linagora/linid-im-front-corelib/compare/v0.0.44...v0.0.45) (2026-02-20)


### Bug Fixes

* bad naming for some components ([dc1efb0](https://github.com/linagora/linid-im-front-corelib/commit/dc1efb0c5672a3aed2aa6be5834ccdb35791addf))

### [0.0.44](https://github.com/linagora/linid-im-front-corelib/compare/v0.0.43...v0.0.44) (2026-02-19)


### Features

* add list and item design ([8cb30f7](https://github.com/linagora/linid-im-front-corelib/commit/8cb30f7b3ac783e13a70c9cfa36becb1f2301ff7))
* add q-btn-dropdown design ([1a0ee97](https://github.com/linagora/linid-im-front-corelib/commit/1a0ee97adfe1cddc8bb8a342422031c92852fb8a))

### [0.0.43](https://github.com/linagora/linid-im-front-corelib/compare/v0.0.42...v0.0.43) (2026-02-19)


### Features

* add type for new fields list and DynamicList ([f1c07cc](https://github.com/linagora/linid-im-front-corelib/commit/f1c07cca37eab3f3472bc0beb55dfdbd6f300e0a))


### Bug Fixes

* remove default string without components to render ([07db5aa](https://github.com/linagora/linid-im-front-corelib/commit/07db5aa6982473c4727a2d5e3a6d5a9784229db8))
* vue warning to avoid performance overhead ([2d80ab3](https://github.com/linagora/linid-im-front-corelib/commit/2d80ab3ac8daf7f089ab2e5c47c3b6ecd2e0fa9c))

### [0.0.42](https://github.com/linagora/linid-im-front-corelib/compare/v0.0.41...v0.0.42) (2026-02-16)


### Features

* add q-spinner design ([1e8c14c](https://github.com/linagora/linid-im-front-corelib/commit/1e8c14c141fbfc3115dac6a27004e081b36a0fc9))

### [0.0.41](https://github.com/linagora/linid-im-front-corelib/compare/v0.0.40...v0.0.41) (2026-02-13)


### Features

* register plugin once inside a zone ([d7a897e](https://github.com/linagora/linid-im-front-corelib/commit/d7a897ee6b5e9c07a570ad3ce8fda9b19eb824ac))

### [0.0.40](https://github.com/linagora/linid-im-front-corelib/compare/v0.0.39...v0.0.40) (2026-02-12)


### Features

* add dialog composable ([f72346d](https://github.com/linagora/linid-im-front-corelib/commit/f72346dc9530e405533339121925f7b86d4ff7ca))
* add LinidDialogProps ([c5f90de](https://github.com/linagora/linid-im-front-corelib/commit/c5f90ded877cdec44a36097c95bab20179567145))

### [0.0.39](https://github.com/linagora/linid-im-front-corelib/compare/v0.0.38...v0.0.39) (2026-02-12)


### Features

* add q-select design ([aabd3c2](https://github.com/linagora/linid-im-front-corelib/commit/aabd3c2b91a60f650f40292243cc06a0a55926c0))

### [0.0.38](https://github.com/linagora/linid-im-front-corelib/compare/v0.0.37...v0.0.38) (2026-02-12)


### Features

* add q-file design ([cce0f0f](https://github.com/linagora/linid-im-front-corelib/commit/cce0f0fea24f4fabb3f7fbdb33fb9aab120420a9))

### [0.0.37](https://github.com/linagora/linid-im-front-corelib/compare/v0.0.36...v0.0.37) (2026-02-05)


### Bug Fixes

* set content-type to application/json for field validation request ([428c0d7](https://github.com/linagora/linid-im-front-corelib/commit/428c0d7eca0e5ca091e9fdc5ecfc3d4f6f686cd3))

### [0.0.36](https://github.com/linagora/linid-im-front-corelib/compare/v0.0.35...v0.0.36) (2026-02-02)


### Features

* add LinidApiErrorResponseBody interface for standardized error responses ([5daa31d](https://github.com/linagora/linid-im-front-corelib/commit/5daa31db5995770743d60477034249b6e72bedb3))

### [0.0.35](https://github.com/linagora/linid-im-front-corelib/compare/v0.0.34...v0.0.35) (2026-01-30)


### Features

* export methods from entity configuration service ([e2dac8c](https://github.com/linagora/linid-im-front-corelib/commit/e2dac8c4b86f4d2271f5902cd4b0c8370621bfe7))

### [0.0.34](https://github.com/linagora/linid-im-front-corelib/compare/v0.0.33...v0.0.34) (2026-01-29)


### Features

* deepEqual method for object, arrays and primitive values comparison ([aaa0869](https://github.com/linagora/linid-im-front-corelib/commit/aaa08698b17375f50f8a1020130d70015fac56d8))

### [0.0.33](https://github.com/linagora/linid-im-front-corelib/compare/v0.0.32...v0.0.33) (2026-01-23)

### [0.0.32](https://github.com/linagora/linid-im-front-corelib/compare/v0.0.31...v0.0.32) (2026-01-23)


### Features

* add built-in field validators following Quasar rules contract ([7de9bcc](https://github.com/linagora/linid-im-front-corelib/commit/7de9bcc65d447b3142eaf42c3887999c1cb54cd5))

### [0.0.31](https://github.com/linagora/linid-im-front-corelib/compare/v0.0.30...v0.0.31) (2026-01-20)

### [0.0.30](https://github.com/linagora/linid-im-front-corelib/compare/v0.0.29...v0.0.30) (2026-01-20)


### Features

* add field validation service and useFieldValidation composable ([3ab568c](https://github.com/linagora/linid-im-front-corelib/commit/3ab568c1587a57e24a96428e233a3bc0dcc547aa)), closes [#40](https://github.com/linagora/linid-im-front-corelib/issues/40)

### [0.0.29](https://github.com/linagora/linid-im-front-corelib/compare/v0.0.28...v0.0.29) (2026-01-20)


### Features

* add q-img design ([d64c773](https://github.com/linagora/linid-im-front-corelib/commit/d64c7733ba48a3d6be7b074178ffd31b329c2cd6))

### [0.0.28](https://github.com/linagora/linid-im-front-corelib/compare/v0.0.27...v0.0.28) (2026-01-20)


### Bug Fixes

* remove type from uiEvent ([ac90622](https://github.com/linagora/linid-im-front-corelib/commit/ac90622727ce2ad9e856687cfeea15bbb37a0a52)), closes [/github.com/linagora/linid-im-front/pull/45#discussion_r2698396004](https://github.com/linagora//github.com/linagora/linid-im-front/pull/45/issues/discussion_r2698396004)

### [0.0.27](https://github.com/linagora/linid-im-front-corelib/compare/v0.0.26...v0.0.27) (2026-01-19)


### Features

* add type safety to attribute configuration with typed input settings ([62766de](https://github.com/linagora/linid-im-front-corelib/commit/62766de2665ee9ad96cdd5fc6e6a98fd5f70f991))

### [0.0.26](https://github.com/linagora/linid-im-front-corelib/compare/v0.0.25...v0.0.26) (2026-01-19)


### Features

* add type for q-date ([45277f6](https://github.com/linagora/linid-im-front-corelib/commit/45277f6846b4c966551f7f628bcf626ebdae8959))

### [0.0.25](https://github.com/linagora/linid-im-front-corelib/compare/v0.0.24...v0.0.25) (2026-01-14)


### Bug Fixes

* export uiEvent to use it in front and plugins ([31d5809](https://github.com/linagora/linid-im-front-corelib/commit/31d58091039849f0dbea043ddafcb0df797d4cfd))

### [0.0.24](https://github.com/linagora/linid-im-front-corelib/compare/v0.0.23...v0.0.24) (2026-01-13)


### Features

* add notify event ([3789911](https://github.com/linagora/linid-im-front-corelib/commit/378991105a756519e42dab45d387c62d510b94d5))

### [0.0.23](https://github.com/linagora/linid-im-front-corelib/compare/v0.0.22...v0.0.23) (2026-01-12)


### Features

* add i18n function te and tm, and add translateOrDefault as i18n helper ([e61e061](https://github.com/linagora/linid-im-front-corelib/commit/e61e061b4f12f92356ca9971055f0968e26df0d5))

### [0.0.22](https://github.com/linagora/linid-im-front-corelib/compare/v0.0.21...v0.0.22) (2026-01-12)


### Features

* add typed options field to ModuleHostConfig for module-specific configuration ([5cc7635](https://github.com/linagora/linid-im-front-corelib/commit/5cc7635d280f18eea78b84dd68238d1242185e5f))

### [0.0.21](https://github.com/linagora/linid-im-front-corelib/compare/v0.0.20...v0.0.21) (2026-01-12)


### Features

* add QInput type ([c6127e4](https://github.com/linagora/linid-im-front-corelib/commit/c6127e4ee8eceeb7fa083da05bb10168411405f1))
* add QToggle type ([997bd78](https://github.com/linagora/linid-im-front-corelib/commit/997bd7879f38ec8e86a2dfa257c4cffbbef6e744))

### [0.0.20](https://github.com/linagora/linid-im-front-corelib/compare/v0.0.19...v0.0.20) (2026-01-09)


### Features

* add qIcon in ui-design ([71c5466](https://github.com/linagora/linid-im-front-corelib/commit/71c5466588dc7f6c953a69271084f21f2f94b5df))

### [0.0.19](https://github.com/linagora/linid-im-front-corelib/compare/v0.0.18...v0.0.19) (2026-01-08)


### Features

* define types for UI design of Quasar card components ([33a61f5](https://github.com/linagora/linid-im-front-corelib/commit/33a61f5d2564b4a11fa09c3807e7db47e1e82ed9))

### [0.0.18](https://github.com/linagora/linid-im-front-corelib/compare/v0.0.17...v0.0.18) (2026-01-06)


### Features

* add LinidUiStore for shared UI state management ([8e1b86a](https://github.com/linagora/linid-im-front-corelib/commit/8e1b86a62f318e8c15870543c39defa9a10c4054))
* add optional meta property to LinidRoute for route metadata ([294312e](https://github.com/linagora/linid-im-front-corelib/commit/294312e837f468e31539b666f566b9f0e0a95850))
* **lifecycle:** pass ModuleHostConfig to initialize, ready and postInit ([787f8e1](https://github.com/linagora/linid-im-front-corelib/commit/787f8e1904f10dc7bf2ee277050eadad025d713a))


### Bug Fixes

* make sort and direction optional in Pagination interface ([b5e5886](https://github.com/linagora/linid-im-front-corelib/commit/b5e5886dc46ee486c5cdf0a16efb86e1f623815c))

### [0.0.17](https://github.com/linagora/linid-im-front-corelib/compare/v0.0.16...v0.0.17) (2025-12-24)


### Features

* define types for UI design of Quasar components ([03f6ff6](https://github.com/linagora/linid-im-front-corelib/commit/03f6ff6d685ce6993bd95018fcf9a3620ab32d13))
* make ui() return typed Quasar component props ([2429fc7](https://github.com/linagora/linid-im-front-corelib/commit/2429fc7a57c7d1d51fbb251976ef8d692bfae63a))

### [0.0.16](https://github.com/linagora/linid-im-front-corelib/compare/v0.0.15...v0.0.16) (2025-12-23)


### Features

* add i18n management ([1f11e39](https://github.com/linagora/linid-im-front-corelib/commit/1f11e39c27831482f49f420c2ec7836d479e6f3f))

### [0.0.15](https://github.com/linagora/linid-im-front-corelib/compare/v0.0.14...v0.0.15) (2025-12-23)


### Features

* add utility service for object manipulation ([2d88c2a](https://github.com/linagora/linid-im-front-corelib/commit/2d88c2a367434a125bd189c41b29e43694c65b58))

### [0.0.14](https://github.com/linagora/linid-im-front-corelib/compare/v0.0.13...v0.0.14) (2025-12-22)


### Features

* store Pinia instance globally ([432bd60](https://github.com/linagora/linid-im-front-corelib/commit/432bd60378bd2ea9d7d27f11c216ef7eeb574a8b))

### [0.0.13](https://github.com/linagora/linid-im-front-corelib/compare/v0.0.12...v0.0.13) (2025-12-19)


### Features

* add basePath property to ModuleHostConfig ([2f01d4c](https://github.com/linagora/linid-im-front-corelib/commit/2f01d4c7d6e59383e4a8b24c938adaac96e65901))
* make LinidRoute recursive for multi-level nested routes ([b864776](https://github.com/linagora/linid-im-front-corelib/commit/b86477678f6a019b7a1bace9d62bfc923c2f613a))


### Bug Fixes

* **ci:** fail workflow if unit tests fail in pull-request workflow ([5e7a50b](https://github.com/linagora/linid-im-front-corelib/commit/5e7a50b602e92d75d7fae49b17d48be080dd3ebf))

### [0.0.12](https://github.com/linagora/linid-im-front-corelib/compare/v0.0.11...v0.0.12) (2025-12-18)


### Features

* add crud operation for all entities ([0b6e684](https://github.com/linagora/linid-im-front-corelib/commit/0b6e6848df20e8fa6d00590d52a931d8e2a1c8df))
* rework on ModuleHostConfig access and it's properties ([fc62191](https://github.com/linagora/linid-im-front-corelib/commit/fc62191c0c62aa761b0866155163df2fa4adb56d))
* store instance of ModuleFederation ([4a8f537](https://github.com/linagora/linid-im-front-corelib/commit/4a8f5370ac2af7c2ef0c646a3b562c9cad1646f3))

### [0.0.11](https://github.com/linagora/linid-im-front-corelib/compare/v0.0.10...v0.0.11) (2025-12-12)


### Features

* add composable to manage UI Design ([22d609f](https://github.com/linagora/linid-im-front-corelib/commit/22d609f2fd928f1dad0260938397942558011a19))
* add types to manage Route ([ef30812](https://github.com/linagora/linid-im-front-corelib/commit/ef308120e1c0d644ae7b46664b62dd5b1555391d))

### [0.0.10](https://github.com/linagora/linid-im-front-corelib/compare/v0.0.9...v0.0.10) (2025-12-11)


### Bug Fixes

* missing src/ on paths to export library ([8e63842](https://github.com/linagora/linid-im-front-corelib/commit/8e63842a00715260ef2c86acfca3968d3ce81543))

### [0.0.9](https://github.com/linagora/linid-im-front-corelib/compare/v0.0.8...v0.0.9) (2025-12-11)


### Bug Fixes

* wrong paths on exporting library ([b69c3fb](https://github.com/linagora/linid-im-front-corelib/commit/b69c3fb6d6ac3de606fbc5f2884481125d22f01d))

### [0.0.8](https://github.com/linagora/linid-im-front-corelib/compare/v0.0.7...v0.0.8) (2025-12-11)


### Bug Fixes

* exporting library ([9ffdc72](https://github.com/linagora/linid-im-front-corelib/commit/9ffdc72e0b2a71643074dded14e2f1cf492e275f))

### [0.0.7](https://github.com/linagora/linid-im-front-corelib/compare/v0.0.6...v0.0.7) (2025-12-11)


### Features

* **eslint:** add import sorting with eslint-plugin-import ([25c76af](https://github.com/linagora/linid-im-front-corelib/commit/25c76aff358a51ef22d3b07fd9b99247c81b7f84))
* export loadAsyncComponent method from federation service ([668c7fe](https://github.com/linagora/linid-im-front-corelib/commit/668c7fe8dc360acb10270ab2431a04609d93e2f1))

### [0.0.6](https://github.com/linagora/linid-im-front-corelib/compare/v0.0.5...v0.0.6) (2025-12-10)


### Features

* **exports:** expose configuration store, services and types ([7a4aed0](https://github.com/linagora/linid-im-front-corelib/commit/7a4aed0c586e9a695979a748293381c5127bbe43))
* **services:** add LinIdConfigurationService for metadata API calls ([6668028](https://github.com/linagora/linid-im-front-corelib/commit/66680287ee87b380419760244fc7aad126eeca74))
* **services:** add singleton HTTP client wrapper ([5cf56fe](https://github.com/linagora/linid-im-front-corelib/commit/5cf56fef21ba2226ba02eaaf1f66b1679ad27b6d))
* **stores:** add LinIdConfigurationStore for entity and route metadata ([e706fee](https://github.com/linagora/linid-im-front-corelib/commit/e706fee22552612c63131c8c2dd4f32604a2005b))
* **types:** add LinId entity and route configuration interfaces ([e9e874b](https://github.com/linagora/linid-im-front-corelib/commit/e9e874b055160943ba711c9b5b1ae3f21f37f11c))

### [0.0.5](https://github.com/linagora/linid-im-front-corelib/compare/v0.0.4...v0.0.5) (2025-12-03)

### [0.0.4](https://github.com/linagora/linid-im-front-corelib/compare/v0.0.3...v0.0.4) (2025-12-01)


### Features

* add lifecycle in RemoteModule and remove app usage ([04d0163](https://github.com/linagora/linid-im-front-corelib/commit/04d01635a3711168daa50c58e7a0c6dba7abdeaa))

### [0.0.3](https://github.com/linagora/linid-im-front-corelib/compare/v0.0.2...v0.0.3) (2025-11-28)


### Bug Fixes

* retrieve valid tag for npm release ([f295e3c](https://github.com/linagora/linid-im-front-corelib/commit/f295e3c54d27b6f42970b50ccb6fd856966aa776))

### [0.0.2](https://github.com/linagora/linid-im-front-corelib/compare/v0.0.1...v0.0.2) (2025-11-28)


### Features

* add module lifecycle skeleton class ([c2332e2](https://github.com/linagora/linid-im-front-corelib/commit/c2332e25fee58a148faaf63ec5c1ebf2b9ea7b17))
* add module lifecycle type definitions ([6c6beb3](https://github.com/linagora/linid-im-front-corelib/commit/6c6beb3675f6810f2f7d106f1572d98111df4af2))
* export module lifecycle types and utilities ([691a2ec](https://github.com/linagora/linid-im-front-corelib/commit/691a2ec86f472cadd3cb1cbe80525de25f4bb995))
* expose source files via exports field ([cf87a3d](https://github.com/linagora/linid-im-front-corelib/commit/cf87a3d8626f399675c52419c2bff7d46b0e3521))
* load zone component with module-federation/enhanced ([858ffce](https://github.com/linagora/linid-im-front-corelib/commit/858ffce1f91aca52506559b5eb070a96e0a42fad))
* migrate project to use pnpm ([d00cb63](https://github.com/linagora/linid-im-front-corelib/commit/d00cb638c311058ff5bf1dadeac799df1d2ebc45))
* setup library ([774e827](https://github.com/linagora/linid-im-front-corelib/commit/774e8279334c087407615ff4e1217edbc206eeda))
* setup pull-request workflow ([1094c6a](https://github.com/linagora/linid-im-front-corelib/commit/1094c6a3340fc3e8d57b2b6f94dcf938cdecca46))
* setup release workflow ([18a9c0b](https://github.com/linagora/linid-im-front-corelib/commit/18a9c0bc98f9cdb9e2c007a71e0ea500c684f83b))


### Bug Fixes

* **lint:** warning message of missing jsdoc in ArrowFunctionExpression ([a95b065](https://github.com/linagora/linid-im-front-corelib/commit/a95b0657d9afe69ccf08a8d9da22cdd1007262ae))
* remove redundant config with the modules.json file ([f3614cc](https://github.com/linagora/linid-im-front-corelib/commit/f3614cc6bb4a97574ccf09543b46fb5b25fcdc24))
