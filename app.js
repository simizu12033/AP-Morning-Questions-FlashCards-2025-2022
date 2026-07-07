const rawCards = window.AP_SOURCE_DATA.cards;
const stateKey = "ap-term-trainer-curated-v2";

const curatedSpecs = [
  ["07_aki-04", "CRC", "送信データを割り算し、余りを検査用に付ける誤り検出方式。受信側も同じ計算をして、余りが合わなければビット誤りと判断する。", "crc", "割り算の余りで誤りを見つける", ["巡回冗長検査"]],
  ["07_aki-12", "IaC", "サーバ、ネットワーク、OS設定などのインフラ構成をコードとして記述し、同じ環境を再現・変更管理できるようにする考え方。", "iac", "設定を手順書ではなくコードで再現する", ["Infrastructure as Code"]],
  ["07_aki-17", "スレッドセーフ", "複数スレッドが同時に呼び出しても、共有データの不整合や破壊が起きないように作られている性質。", "thread", "同時実行でも共有状態が壊れない", []],
  ["07_aki-26", "NoSQL", "リレーショナル表に限定せず、キー値、ドキュメント、列指向、グラフなどで柔軟にデータを扱うDB群。", "nosql", "表だけではないDB。柔軟性と分散が合図", []],
  ["07_aki-28", "ビュー", "実表から必要な列や行を切り出して見せる仮想表。利用者には表に見えるが、実データを直接持たないことが多い。", "view", "実表そのものではなく仮想的な見せ方", []],
  ["07_aki-29", "多版同時実行制御", "更新前後の複数バージョンを保持し、読取りと書込みを衝突させにくくする同時実行制御。", "mvcc", "読む人は古い版、書く人は新しい版", ["MVCC"]],
  ["07_aki-31", "リバースプロキシ", "サーバ側の入口に置かれ、利用者からの要求をバックエンドへ中継する。負荷分散、TLS終端、キャッシュなどに使う。", "reverseProxy", "クライアントの代理ではなくサーバ群の前に立つ代理", []],
  ["07_aki-34", "スパニングツリープロトコル", "スイッチ間の冗長リンクでループが起きないよう、一部ポートを論理的に止めて木構造を作るプロトコル。", "stp", "冗長リンクは残しつつループだけ止める", ["STP"]],
  ["07_aki-36", "サイバーキルチェーン", "攻撃者の行動を、偵察から目的達成までの段階に分けて防御ポイントを考えるモデル。", "killchain", "攻撃を一連の段階で分解する", []],
  ["07_aki-39", "CRL", "失効した証明書の一覧。証明書を信頼してよいかを、失効リストと照合して確認する。", "crl", "証明書のブラックリスト", ["Certificate Revocation List"]],
  ["07_aki-40", "PSIRT", "自社製品やサービスの脆弱性情報を受け付け、分析、修正、公開調整を行う組織。", "psirt", "製品の脆弱性対応チーム", []],
  ["07_aki-42", "CSPM", "クラウド環境の設定を継続的に点検し、公開設定ミス、権限過多、ポリシー違反などを検出する管理手法。", "cspm", "クラウド設定ミスを見つける", ["Cloud Security Posture Management"]],
  ["07_aki-44", "デジタルフォレンジックス", "証拠性を保ちながら端末、ログ、通信記録を保全・解析し、インシデントの事実を明らかにする活動。", "forensics", "証拠保全してから解析する", []],
  ["07_aki-46", "ペルソナ", "利用者の役割、目的、行動、困りごとを具体化した仮想人物。要件定義やUX設計の判断軸にする。", "persona", "実在風の利用者像で設計判断する", []],
  ["07_aki-49", "PWA", "Webアプリにオフライン利用、ホーム画面追加、プッシュ通知などを持たせ、ネイティブアプリに近い体験を提供する技術。", "pwa", "Webなのにアプリのように使える", ["プログレッシブWebアプリ"]],
  ["07_aki-52", "タックマンモデル", "チームが形成期、混乱期、統一期、機能期を経て成熟するという発達段階モデル。", "tuckman", "チーム成熟の4段階", []],
  ["07_aki-54", "デシジョンツリー分析", "選択肢、発生確率、結果を木で表し、期待値などで意思決定を比較する方法。", "decisionTree", "分岐と期待値で選択する", []],
  ["07_aki-62", "SOA", "業務機能をサービスとして疎結合に組み合わせ、再利用しやすくするアーキテクチャ。", "soa", "業務機能をサービス部品として組み合わせる", ["サービス指向アーキテクチャ"]],
  ["07_aki-63", "アソシエーション分析", "同時に起きやすい組合せを見つける分析。買物かご分析のように、Aを買う人はBも買いやすいといった規則を探す。", "association", "同時発生する組合せを探す", []],
  ["07_aki-70", "アンゾフの成長マトリクス", "製品と市場を既存・新規で分け、市場浸透、製品開発、市場開拓、多角化を整理する枠組み。", "ansoff", "製品×市場の2軸で成長戦略を選ぶ", []],
  ["07_aki-71", "MES", "製造現場の作業指示、実績収集、品質、設備状態などを管理し、計画と現場実行をつなぐシステム。", "mes", "製造の実行を管理する", ["Manufacturing Execution System"]],
  ["07_aki-72", "PLM", "企画、設計、製造、保守、廃棄まで、製品ライフサイクル全体の情報を管理する仕組み。", "plm", "製品の一生を情報でつなぐ", ["Product Lifecycle Management"]],
  ["07_aki-73", "LPWA", "低消費電力で長距離通信できる無線通信。IoTセンサーなど、少量データを長期間送る用途に向く。", "lpwa", "省電力、長距離、少量データ", []],

  ["07_haru-06", "AVL木", "左右の部分木の高さ差を一定以内に保つ平衡二分探索木。検索、挿入、削除の性能を安定させる。", "avl", "二分探索木を回転で平衡に保つ", []],
  ["07_haru-09", "DMAコントローラー", "CPUを介さず、入出力装置と主記憶の間で直接データ転送を行う制御装置。", "dma", "CPUを通さずメモリへ直接転送する", ["DMA"]],
  ["07_haru-10", "オブジェクトストレージ", "データ本体にメタデータと一意なIDを付け、階層ディレクトリではなくオブジェクトとして管理するストレージ。", "objectStorage", "ファイルパスではなくIDとメタデータで管理", []],
  ["07_haru-15", "LRU方式", "最後に使われてから最も時間が経過したページを追い出す置換え方式。", "lru", "最近使っていないものから退避", ["Least Recently Used"]],
  ["07_haru-17", "OpenAPI Specification", "REST APIの仕様を機械可読に記述し、APIドキュメント生成やクライアント生成に利用できる形式。", "openapi", "API仕様書を機械可読にする", ["OAS", "Open API Specification"]],
  ["07_haru-29", "PoE", "LANケーブルでデータ通信と電力供給を同時に行う仕組み。監視カメラや無線APで使われる。", "poe", "LANケーブル一本で通信と給電", ["Power over Ethernet"]],
  ["07_haru-34", "Base64", "バイナリデータを64種類の文字で表し、メールやHTTPなどテキスト前提の経路で扱いやすくする符号化。", "base64", "バイナリを文字列として運ぶ", ["base64エンコーディング"]],
  ["07_haru-37", "サイドチャネル攻撃", "処理時間、消費電力、電磁波など、本来の入出力ではない副次情報から秘密情報を推測する攻撃。", "sideChannel", "横から漏れる副次情報を読む", []],
  ["07_haru-38", "OCSP", "証明書が失効していないかを、認証局側へオンラインで問い合わせるプロトコル。", "ocsp", "証明書の失効状態をオンライン確認", ["Online Certificate Status Protocol"]],
  ["07_haru-40", "SBOM", "ソフトウェアを構成するライブラリ、部品、バージョンなどを一覧化した部品表。脆弱性影響調査に使う。", "sbom", "ソフトウェアの部品表", ["Software Bill of Materials"]],
  ["07_haru-41", "CookieのSecure属性", "CookieをHTTPS通信時だけ送信するよう指定する属性。平文HTTPでの漏えいを防ぎやすくする。", "secureCookie", "HTTPSのときだけCookieを送る", ["Secure属性"]],
  ["07_haru-42", "OSコマンドインジェクション", "入力値にOSコマンドを混ぜ、サーバ上で意図しない命令を実行させる攻撃。", "commandInjection", "入力欄からOSコマンドを実行させる", []],
  ["07_haru-44", "ストレッチング", "パスワードハッシュ計算を多数回繰り返し、総当たり攻撃に必要な時間を増やす対策。", "stretching", "ハッシュを何度も回して攻撃を遅くする", []],
  ["07_haru-48", "XP", "ペアプログラミング、テスト駆動開発、継続的インテグレーションなどを重視するアジャイル開発手法。", "xp", "短い反復と実践重視のアジャイル", ["Extreme Programming"]],
  ["07_haru-51", "プロジェクト憲章", "プロジェクトの目的、権限、主要な要求事項を明確にし、正式に開始を承認する文書。", "charter", "プロジェクト開始を正式承認する文書", []],
  ["07_haru-63", "プロビジョニング", "必要なサーバ、アカウント、ネットワーク、サービスなどの資源を準備し、利用可能にすること。", "provisioning", "必要な資源を用意して使える状態にする", []],
  ["07_haru-67", "PPM", "市場成長率と相対的市場シェアで事業を分類し、投資配分を考える分析手法。", "ppm", "市場成長率×市場シェア", ["プロダクトポートフォリオマネジメント"]],
  ["07_haru-69", "ビジネスモデルキャンバス", "顧客、価値提案、チャネル、収益、コストなどを一枚で整理するビジネスモデル設計の枠組み。", "canvas", "事業の要素を一枚に並べる", []],
  ["07_haru-70", "フリーミアム", "基本機能を無料で提供し、高度な機能や追加価値を有料化するビジネスモデル。", "freemium", "無料で入口、有料で収益化", []],
  ["07_haru-73", "コンピテンシーモデル", "高い成果を出す人に共通する行動特性や能力を整理したモデル。人材育成や評価に使う。", "competency", "成果を出す人の行動特性を型にする", []],

  ["06_aki-02", "交差検証", "教師あり学習でデータを複数に分け、学習用と検証用を入れ替えながら汎化性能を評価する方法。", "crossValidation", "学習データを分け替えて性能を見る", ["クロスバリデーション"]],
  ["06_aki-03", "逆ポーランド表記法", "演算子を被演算子の後に書く表記法。括弧なしで演算順序を表せ、スタックで処理しやすい。", "rpn", "演算子を後ろに置く", ["後置記法"]],
  ["06_aki-11", "ファイバチャネル", "サーバとストレージを高速接続するためのネットワーク技術。SANで使われる。", "fiberChannel", "サーバとストレージを高速につなぐ", ["Fibre Channel"]],
  ["06_aki-17", "スラッシング", "ページ置換が頻発し、CPUが本来の処理よりページ入替えばかりに時間を使って性能が低下する状態。", "thrashing", "メモリ不足でページ入替え地獄", []],
  ["06_aki-22", "SoC", "CPU、メモリ制御、入出力、通信機能など複数機能を一つの半導体チップに集積したもの。", "soc", "システム機能を一つのチップへ", ["System on a Chip"]],
  ["06_aki-23", "アクチュエーター", "電気信号などの制御信号を、動き、力、回転などの物理的動作に変換する装置。", "actuator", "制御信号を物理的な動きに変える", []],
  ["06_aki-24", "耐タンパ性", "装置やチップが解析、改ざん、不正読み出しを受けにくいようにする性質。", "tamper", "物理的な解析や改ざんに強い", []],
  ["06_aki-27", "2相コミット", "複数資源のトランザクションを、準備確認と確定の2段階で全体として成功または失敗にそろえる方式。", "twoPhaseCommit", "準備して全員OKなら一斉コミット", ["2PC"]],
  ["06_aki-31", "DBMSのチェックポイント", "障害復旧を効率化するため、更新済み内容を一定時点でディスクに反映し、復旧開始点を作る仕組み。", "checkpoint", "復旧を短くするための記録地点", []],
  ["06_aki-33", "DNS", "ドメイン名とIPアドレスを対応付ける名前解決の仕組み。", "dns", "名前をIPアドレスへ引く", []],
  ["06_aki-34", "ICMP", "IP通信のエラー通知や診断に使われるプロトコル。pingの疎通確認で使われる。", "icmp", "IP通信のエラー通知と診断", []],
  ["06_aki-37", "SAML認証", "認証情報をXMLベースのアサーションとして交換し、シングルサインオンを実現する仕組み。", "saml", "認証結果をアサーションで渡すSSO", ["SAML"]],
  ["06_aki-40", "パスワードリスト攻撃", "他サービスから漏えいしたIDとパスワードの組合せを使い、別サービスへのログインを試す攻撃。", "passwordList", "漏えい済みの組合せを使い回す攻撃", []],
  ["06_aki-41", "CVE識別子", "公開された脆弱性に付けられる共通識別子。CVE-年-番号の形で管理される。", "cve", "脆弱性の共通ID", ["CVE"]],
  ["06_aki-42", "DNSキャッシュポイズニング", "DNSキャッシュに偽の名前解決情報を入れ、利用者を偽サイトへ誘導する攻撃。", "dnsPoison", "DNSの記憶に偽IPを混ぜる", []],
  ["06_aki-43", "SBOM", "ソフトウェア部品表。依存ライブラリやバージョンを把握し、脆弱性影響範囲を調べる。", "sbom", "ソフトウェアの部品表", ["Software Bill of Materials"]],
  ["06_aki-44", "DNSSEC", "DNS応答に電子署名を付け、応答の正当性や改ざん検知を可能にする仕組み。", "dnssec", "DNS応答に署名を付ける", []],
  ["06_aki-46", "エクスプロイトコード", "脆弱性を実際に悪用するためのコード。攻撃実証や検証にも使われる。", "exploit", "脆弱性を突く実行コード", []],
  ["06_aki-47", "マイクロサービスアーキテクチャ", "アプリケーションを小さな独立サービスに分割し、疎結合に連携させる設計。", "microservice", "小さな独立サービスの集合", []],
  ["06_aki-50", "レスポンシブWebデザイン", "画面幅や端末に応じてレイアウトを変え、PCとスマートフォンで同じコンテンツを見やすく表示する設計。", "responsive", "画面幅に合わせてレイアウトを変える", []],
  ["06_aki-52", "WBS", "プロジェクト作業を成果物中心に階層分解した構成図。最下位は具体的な作業パッケージになる。", "wbs", "作業を階層分解する", ["Work Breakdown Structure"]],
  ["06_aki-54", "ファストトラッキング", "本来順番に行う作業を重ねて進め、期間短縮を狙うスケジュール短縮技法。", "fastTracking", "順番の作業を並行させて短縮", []],
  ["06_aki-60", "フォローアップ", "監査結果に対して、改善措置が実施されているかを確認する活動。", "followup", "指摘後の改善状況を確認する", []],
  ["06_aki-62", "オープンデータバイデザイン", "データ公開を後付けではなく、企画・設計段階から公開しやすい形で考えること。", "openData", "最初から公開しやすく設計する", []],
  ["06_aki-65", "UXデザイン", "利用者が製品やサービスを使う前後を含めた体験全体を設計する考え方。", "ux", "画面だけでなく体験全体を設計する", []],
  ["06_aki-66", "アクティビティ図", "業務や処理の流れ、分岐、並行処理を表すUMLの図。", "activity", "処理の流れをUMLで表す", []],
  ["06_aki-67", "SCM", "調達、生産、物流、販売までの供給連鎖を全体最適で管理する仕組み。", "scm", "供給の流れを全体で管理する", ["Supply Chain Management"]],
  ["06_aki-69", "コ・クリエーション戦略", "企業だけでなく顧客や外部パートナーと共に価値を創造する戦略。", "cocreation", "顧客や外部と一緒に価値を作る", []],
  ["06_aki-75", "ゲーム理論", "複数の意思決定者が互いの選択を考慮して戦略を選ぶ状況を分析する理論。", "gameTheory", "相手の出方を読んで戦略を選ぶ", []],

  ["06_haru-03", "ディープラーニング", "多層のニューラルネットワークを用い、画像、音声、自然言語などの特徴を自動的に学習する機械学習手法。", "deepLearning", "多層ネットワークで特徴を学習する", []],
  ["06_haru-04", "ハミング符号", "データに検査ビットを加え、1ビット誤りの訂正などを可能にする誤り制御符号。", "hamming", "検査ビットで誤り位置を見つける", []],
  ["06_haru-25", "ストアドプロシージャ", "DBMS内に保存して実行できる一連のSQL処理。処理をDB側にまとめられる。", "storedProcedure", "SQL処理をDB側に保存して実行", []],
  ["06_haru-26", "COALESCE", "引数を左から見て、最初にNULLでない値を返すSQL関数。", "coalesce", "NULLでない最初の値を返す", []],
  ["06_haru-28", "スタースキーマ", "中央のファクト表の周囲にディメンション表を配置する、データウェアハウス向けのスキーマ。", "starSchema", "中心に事実表、周囲に次元表", []],
  ["06_haru-30", "CSMA/CD", "送信前に回線を確認し、衝突を検出したら送信を中止して再送するLANのアクセス制御方式。", "csmacd", "聞いてから送る。衝突したら再送", []],
  ["06_haru-34", "SDN", "ネットワークの制御機能と転送機能を分離し、ソフトウェアで集中制御する考え方。", "sdn", "制御をソフトウェアで集中管理する", ["Software-Defined Networking"]],
  ["06_haru-35", "3Dセキュア2.0", "クレジットカード決済で、カード会社がリスクベース認証を行い本人確認を強化する仕組み。", "threeDS", "カード決済の本人認証を強化する", []],
  ["06_haru-39", "PSIRT", "自社製品の脆弱性対応を担う組織。報告受付、分析、修正、公開調整を行う。", "psirt", "製品脆弱性の対応窓口", []],
  ["06_haru-41", "WAF", "WebアプリへのHTTP通信を検査し、SQLインジェクションやクロスサイトスクリプティングなどを防ぐ防御装置。", "waf", "Webアプリ層の攻撃を遮断する", ["Web Application Firewall"]],
  ["06_haru-43", "SPF", "送信元メールサーバのIPアドレスが、そのドメインから送信してよいものかをDNSで確認する仕組み。", "spf", "送信元IPをDNSで確認するメール認証", ["Sender Policy Framework"]],
  ["06_haru-45", "オブジェクト指向", "データと操作をオブジェクトとしてまとめ、継承、カプセル化、多態性などを使って設計する考え方。", "oop", "データと操作をオブジェクトにまとめる", []],
  ["06_haru-46", "モジュール結合度", "モジュール同士の依存の強さ。低いほど変更の影響が小さく、独立性が高い。", "coupling", "低結合ほど変更に強い", []],
  ["06_haru-48", "リーンソフトウェア開発", "ムダをなくし、学習を増やし、できるだけ遅く決定し、速く提供することを重視する開発思想。", "lean", "ムダを減らして価値提供を速くする", []],
  ["06_haru-50", "ドキュメンテーションジェネレーター", "ソースコード中のコメントや注釈から、API仕様書などの文書を自動生成するツール。", "docGenerator", "コードコメントから文書を生成する", []],
  ["06_haru-57", "GHGプロトコル", "温室効果ガス排出量を算定・報告するための国際的な基準。", "ghg", "温室効果ガス排出量の算定基準", []],
  ["06_haru-58", "監査調書", "監査人が実施した手続、入手した証拠、判断過程、結論などを記録した文書。", "auditPaper", "監査の証拠と判断を残す文書", []],
  ["06_haru-61", "エンタープライズアーキテクチャ", "業務、データ、アプリケーション、技術を全体最適の視点で整理する企業情報システムの設計体系。", "ea", "企業全体を業務・データ・技術で整理する", ["EA"]],
  ["06_haru-66", "コンティンジェンシープラン", "想定外の事故や障害が起きたときに備える緊急時対応計画。", "contingency", "もしもの時の代替計画", []],
  ["06_haru-70", "デジタルツイン", "現実世界の設備や製品をデジタル空間に再現し、監視、分析、シミュレーションに使う仕組み。", "digitalTwin", "現実の双子をデジタル上に作る", []],
  ["06_haru-71", "マスカスタマイゼーション", "大量生産の効率を保ちながら、顧客ごとに個別化した製品やサービスを提供する考え方。", "massCustomization", "大量生産と個別対応を両立する", []],
  ["06_haru-72", "エッジコンピューティング", "端末やセンサーに近い場所で処理し、クラウドへの通信量や遅延を減らす考え方。", "edge", "データ発生源の近くで処理する", []],
  ["06_haru-73", "ナッシュ均衡", "各参加者が相手の戦略を前提に、自分だけ戦略を変えても得をしない状態。", "nash", "誰も一人だけ変えて得しない均衡", []],
  ["06_haru-74", "特性要因図", "結果である特性と、その原因候補を魚の骨状に整理する図。原因分析に使う。", "fishbone", "結果に対する原因を魚の骨で整理", ["フィッシュボーン図"]],
  ["06_haru-80", "要配慮個人情報", "本人への不当な差別や偏見が生じないよう特に配慮が必要な個人情報。病歴、障害、犯罪歴などが該当する。", "sensitiveInfo", "扱いに特別な配慮が必要な個人情報", []],

  ["05_aki-04", "垂直水平パリティチェック", "データを行方向と列方向の両方でパリティ検査し、誤りの位置を特定しやすくする誤り検出方式。", "crc", "行と列の交点で誤り位置を見つける", []],
  ["05_aki-07", "JSON", "JavaScriptのオブジェクト表記に由来する、軽量なデータ記述形式。Web APIのデータ交換でよく使われる。", "openapi", "キーと値で軽くデータを渡す", ["JavaScript Object Notation"]],
  ["05_aki-10", "ウェアレベリング", "フラッシュメモリの同じ領域に書込みが集中しないよう、書込み位置を分散して寿命を延ばす技術。", "mechanism", "書込みをならして寿命を延ばす", []],
  ["05_aki-12", "SAN", "サーバとストレージを専用ネットワークで接続し、複数サーバから共有ストレージを利用できる構成。", "fiberChannel", "サーバとストレージ専用のネットワーク", ["Storage Area Network"]],
  ["05_aki-19", "Linuxカーネル", "Linux OSの中核部分。プロセス、メモリ、ファイル、デバイスなどの基本資源を管理する。", "system", "OSの中核が資源を管理する", []],
  ["05_aki-20", "FPGA", "製造後に論理回路の構成を変更できる半導体デバイス。用途に合わせて回路を再構成できる。", "soc", "後から回路を書き換えられる半導体", ["Field Programmable Gate Array"]],
  ["05_aki-25", "レンダリング", "3Dモデルやシーンデータから、光、陰影、質感を計算して画像を生成する処理。", "system", "形や光のデータから画像を描く", []],
  ["05_aki-27", "外部キー", "別の表の主キーなどを参照し、表同士の関連と参照整合性を保つための列。", "data", "別表の主キーを参照して関係を保つ", []],
  ["05_aki-32", "NAPT", "複数のプライベートIPアドレスを、一つのグローバルIPアドレスとポート番号の組合せに変換する仕組み。", "system", "IPアドレスだけでなくポート番号も変換する", ["IPマスカレード"]],
  ["05_aki-35", "マルチキャスト", "特定のグループに参加している複数の宛先へ、同じデータを効率よく配送する通信方式。", "system", "一対多だが必要なグループだけに送る", []],
  ["05_aki-36", "レインボー攻撃", "事前計算したハッシュ値の表を使い、パスワードハッシュから元のパスワードを推測する攻撃。", "security", "事前計算表でハッシュを逆引きする", []],
  ["05_aki-37", "楕円曲線暗号", "楕円曲線上の離散対数問題を利用し、短い鍵長でも高い安全性を得やすい公開鍵暗号方式。", "trust", "短い鍵で強い公開鍵暗号を作る", ["ECC"]],
  ["05_aki-42", "セキュアブート", "起動時にファームウェアやOSの署名を検証し、改ざんされたソフトウェアの起動を防ぐ仕組み。", "trust", "起動前に署名を確認して改ざんを防ぐ", []],
  ["05_aki-43", "ランサムウェア", "ファイルを暗号化するなどして利用不能にし、復旧の対価として金銭を要求するマルウェア。", "security", "暗号化して身代金を要求する", []],
  ["05_aki-44", "DKIM", "送信メールに電子署名を付け、受信側がDNS上の公開鍵で送信ドメインと改ざん有無を確認する仕組み。", "spf", "メールに署名を付けて改ざんを確認する", ["DomainKeys Identified Mail"]],
  ["05_aki-50", "IDE", "エディタ、コンパイラ、デバッガなどをまとめ、プログラム開発を一体的に支援する環境。", "system", "開発に必要な道具を一つにまとめる", ["統合開発環境"]],
  ["05_aki-51", "プロジェクト・スコープ記述書", "プロジェクトで作る成果物、作業範囲、除外事項などを明確に記述した文書。", "cycle", "何を作り、何を含めないかを書く", []],
  ["05_aki-57", "差分バックアップ", "前回のフルバックアップ以降に変更されたデータだけを保存するバックアップ方式。", "data", "最後のフル以降の変更分だけを取る", []],
  ["05_aki-61", "バックキャスティング", "望ましい未来像を先に描き、そこから逆算して現在取るべき行動を考える方法。", "strategy", "未来から逆算して今を決める", []],
  ["05_aki-68", "パーミッションマーケティング", "顧客から事前に同意を得た上で、メールなどのマーケティング情報を提供する手法。", "strategy", "同意を得てから売り込む", []],
  ["05_aki-70", "オープンイノベーション", "社外の技術、知識、人材、アイデアを取り込み、自社だけではない形で革新を生み出す考え方。", "cycle", "外部と組んで新しい価値を作る", []],
  ["05_aki-71", "サイバーフィジカルシステム", "現実世界から収集したデータをサイバー空間で分析し、現実世界へフィードバックする仕組み。", "digitalTwin", "現実とサイバーをデータで循環させる", ["CPS"]],
  ["05_aki-72", "ギグエコノミー", "単発・短期の仕事を、インターネット上の仲介サービスなどを通じて受発注する経済形態。", "strategy", "単発の仕事をネット経由で受発注する", []],
  ["05_aki-73", "マシンビジョン", "カメラなどで取得した画像を機械が処理し、検査、認識、位置決めなどを行う技術。", "edge", "機械が画像を見て判断する", []],
  ["05_aki-74", "レジリエンス", "障害、災害、変化などを受けても、機能を維持・回復し適応する能力。", "cycle", "折れても戻る組織やシステムの力", []],
  ["05_aki-75", "コンティンジェンシー理論", "唯一最善の管理方法はなく、環境や状況に応じて適した組織形態や管理方法が変わるという考え方。", "strategy", "状況によって最適な管理は変わる", []],

  ["05_haru-03", "ROC曲線", "分類モデルのしきい値を変えたときの真陽性率と偽陽性率の関係を表す曲線。識別性能の比較に使う。", "strategy", "真陽性率と偽陽性率で分類性能を見る", []],
  ["05_haru-13", "スケールイン", "稼働中のサーバ台数やインスタンス数を減らし、処理能力やコストを縮小すること。", "system", "台数を減らして縮小する", []],
  ["05_haru-20", "コンテナ型仮想化", "アプリケーションと実行環境をコンテナとして隔離し、ホストOSのカーネルを共有して動かす仮想化方式。", "system", "OSカーネルを共有しアプリ環境を隔離する", []],
  ["05_haru-23", "LiDAR", "レーザー光を照射し、反射して戻る時間などから対象物までの距離や形状を測定する技術。", "mechanism", "レーザーの反射で距離を測る", []],
  ["05_haru-24", "NFC", "数cm程度の近距離で通信する無線通信技術。ICカードやスマートフォン決済で使われる。", "lpwa", "かざす距離で通信する", ["Near Field Communication"]],
  ["05_haru-28", "べき等", "同じ操作を何回実行しても、1回実行した場合と結果が変わらない性質。", "mechanism", "何回やっても結果が同じ", ["idempotent"]],
  ["05_haru-31", "PLC", "工場設備や機械を制御するための専用コンピュータ。センサー入力に応じてアクチュエータを制御する。", "actuator", "工場制御の専用コンピュータ", ["Programmable Logic Controller"]],
  ["05_haru-36", "C&Cサーバ", "マルウェアに感染した端末へ攻撃者が指令を送り、情報窃取や攻撃を制御するためのサーバ。", "security", "感染端末へ命令を送る司令塔", ["Command and Controlサーバ"]],
  ["05_haru-37", "セキュアOS", "アクセス制御や権限管理を強化し、通常のOSより厳格に資源利用を制限するOS。", "trust", "OSレベルで権限を厳しく制御する", []],
  ["05_haru-39", "ISMAP", "政府情報システムで利用するクラウドサービスの安全性を評価・登録する制度。", "trust", "政府利用クラウドの安全性評価制度", []],
  ["05_haru-41", "TPM", "暗号鍵の保護、起動時の完全性確認などに使う、PCなどに搭載されるセキュリティチップ。", "trust", "鍵を守るためのセキュリティチップ", ["Trusted Platform Module"]],
  ["05_haru-44", "サブミッションポート", "メールクライアントがメール送信サーバへ投稿するための専用ポート。通常587番を使う。", "system", "メール投稿用の587番ポート", []],
  ["05_haru-47", "決定表", "条件の組合せと、それに対応する処理や動作を表形式で整理する設計・テスト技法。", "strategy", "条件の組合せと処理を表で整理する", []],
  ["05_haru-52", "クリティカルチェーン法", "資源制約を考慮してプロジェクトの最短経路を管理し、バッファで納期を守る手法。", "cycle", "資源制約とバッファで納期を守る", []],
  ["05_haru-54", "デルファイ法", "複数の専門家へ匿名で意見を聞き、結果をフィードバックしながら合意形成や予測を行う方法。", "cycle", "専門家の匿名意見を繰り返し集約する", []],
  ["05_haru-62", "カスタマーエクスペリエンス", "購入前から利用後まで、顧客が企業や商品と接することで得る体験全体。", "cycle", "顧客体験全体を見る", ["CX"]],
  ["05_haru-63", "情報銀行", "個人から委任を受け、本人に代わってパーソナルデータを管理し、第三者提供などを行う事業者。", "trust", "本人の委任で個人データを管理・提供する", []],
  ["05_haru-64", "トレーサビリティ", "要求、設計、実装、テストなどの対応関係を追跡できる性質。変更影響分析に役立つ。", "cycle", "要求からテストまで対応を追える", []],
  ["05_haru-65", "RFI", "調達前にベンダへ情報提供を依頼し、製品・サービス・技術情報を収集するための文書。", "cycle", "提案依頼の前に情報を集める", ["Request For Information"]],
  ["05_haru-68", "戦略マップ", "財務、顧客、内部プロセス、学習と成長などの視点で、戦略目標の因果関係を可視化する図。", "strategy", "戦略目標の因果関係を地図にする", []],
  ["05_haru-71", "エネルギーハーベスティング", "光、振動、熱など周囲の微小なエネルギーを回収して電力として利用する技術。", "mechanism", "周囲の小さなエネルギーを集めて使う", []],
  ["05_haru-72", "アグリゲーションサービス", "複数のサービスや情報を一つに集約し、利用者がまとめて確認・操作できるようにするサービス。", "system", "複数サービスを一つにまとめる", []],
  ["05_haru-80", "集団思考", "集団の合意を重視しすぎて、反対意見や代替案の検討が不十分になり、判断が偏る現象。", "strategy", "仲良くまとまりすぎて判断が鈍る", ["グループシンク"]],

  ["04_aki-04", "過学習", "学習データに過度に適合し、未知データに対する予測性能が低下する状態。", "crossValidation", "訓練データだけに合わせすぎる", []],
  ["04_aki-08", "GPU", "多数の演算コアで同種の計算を並列処理するのに向いたプロセッサ。画像処理や機械学習で使われる。", "system", "同じ種類の計算を大量並列に処理する", ["Graphics Processing Unit"]],
  ["04_aki-09", "ライトスルー", "キャッシュへ書き込むたびに主記憶にも同時に書き込む方式。データ整合性を保ちやすい。", "data", "キャッシュと主記憶へ同時に書く", []],
  ["04_aki-11", "電気泳動型電子ペーパー", "帯電した粒子を電界で移動させて表示する電子ペーパー。表示保持に電力をほとんど使わない。", "mechanism", "粒子を電気で動かして表示する", []],
  ["04_aki-17", "ページング方式", "仮想記憶を固定長のページに分け、必要なページを主記憶へ読み込むメモリ管理方式。", "data", "メモリを固定長ページで管理する", []],
  ["04_aki-22", "フラッシュメモリ", "電気的にデータの消去・書込みができ、電源を切っても内容を保持する不揮発性メモリ。", "data", "電源を切っても消えない半導体メモリ", []],
  ["04_aki-25", "H.264/MPEG-4 AVC", "動画を高効率に圧縮するための符号化方式。動画配信や録画で広く使われる。", "system", "動画を効率よく圧縮する規格", ["AVC"]],
  ["04_aki-30", "ACID特性", "トランザクションが満たすべき原子性、一貫性、独立性、永続性の性質。", "data", "トランザクションの4つの約束", ["Atomicity Consistency Isolation Durability"]],
  ["04_aki-31", "DHCP", "ネットワーク端末へIPアドレス、デフォルトゲートウェイ、DNSサーバなどの設定を自動配布する仕組み。", "system", "IP設定を自動で配る", ["Dynamic Host Configuration Protocol"]],
  ["04_aki-36", "DNSリフレクション攻撃", "オープンリゾルバを悪用し、送信元を偽装したDNS応答を標的へ集中させるDDoS攻撃。", "dnsPoison", "DNS応答を反射させて標的へ集める", []],
  ["04_aki-40", "JVN", "国内外の脆弱性対策情報を収集し、利用者や管理者へ提供するためのポータル。", "cve", "脆弱性対策情報を知らせる窓口", ["Japan Vulnerability Notes"]],
  ["04_aki-41", "リスクアセスメント", "リスクを特定し、分析し、評価する一連のプロセス。対策の優先度を決める土台になる。", "cycle", "リスクを見つけ、分析し、評価する", []],
  ["04_aki-45", "ファジング", "ソフトウェアへ大量の異常データやランダムデータを入力し、脆弱性や不具合を見つける手法。", "security", "変な入力を大量に投げて弱点を探す", []],
  ["04_aki-46", "ウォークスルー", "作成者が成果物を説明し、参加者が欠陥や改善点を見つけるレビュー技法。", "cycle", "作成者が説明しながらレビューする", []],
  ["04_aki-47", "FTA", "望ましくない事象を頂上に置き、その原因を論理的に分解して分析する手法。", "fishbone", "故障原因を木構造で分解する", ["Fault Tree Analysis"]],
  ["04_aki-49", "テスト駆動開発", "先にテストを書き、そのテストを満たす実装を行い、リファクタリングする開発手法。", "xp", "テストを先に書いて実装する", ["TDD"]],
  ["04_aki-50", "KPT", "Keep、Problem、Tryの三つで活動を振り返り、継続すること、問題、次に試すことを整理する手法。", "cycle", "続ける・問題・試すで振り返る", []],
  ["04_aki-52", "プレシデンスダイアグラム法", "作業をノード、依存関係を矢印で表し、プロジェクトの作業順序を整理する手法。", "decisionTree", "作業の前後関係を図で表す", ["PDM"]],
  ["04_aki-55", "問題管理", "インシデントの根本原因を特定し、再発防止や恒久対策を管理するプロセス。", "cycle", "原因を突き止めて再発を防ぐ", []],
  ["04_aki-61", "BCP", "災害や事故などが起きても重要業務を継続または早期復旧するための計画。", "contingency", "事業を止めないための計画", ["事業継続計画"]],
  ["04_aki-67", "デューデリジェンス", "買収や投資の前に、対象企業の財務、法務、事業、リスクなどを詳細調査すること。", "cycle", "買収前に相手を詳しく調べる", []],
  ["04_aki-68", "ターゲットリターン価格設定", "目標利益率を達成できるよう、必要な利益を織り込んで価格を設定する方法。", "strategy", "目標利益から価格を決める", []],
  ["04_aki-69", "コンジョイント分析", "商品属性の組合せに対する評価から、各属性が顧客選好に与える影響を推定する分析手法。", "strategy", "属性の組合せから好みを分解する", []],
  ["04_aki-70", "APIエコノミー", "APIを通じて機能やデータを外部に提供し、他社サービスと連携して価値を生む経済圏。", "system", "API連携で価値を広げる", []],
  ["04_aki-71", "ファブレス", "自社では工場を持たず、企画や設計に集中し、製造を外部企業へ委託する事業形態。", "strategy", "工場を持たず設計に集中する", []],
  ["04_aki-74", "SL理論", "部下の成熟度に応じて、リーダーシップのスタイルを変えるべきだとする理論。", "strategy", "相手の成熟度でリーダーシップを変える", []],

  ["04_haru-06", "再入可能プログラム", "複数の処理から同時に呼び出されても、共有状態を壊さず安全に実行できるプログラム。", "thread", "同時に入っても壊れない", ["リエントラント"]],
  ["04_haru-10", "フルアソシエイティブ方式", "キャッシュの任意のブロックに主記憶の任意のブロックを格納できる方式。競合が少ない。", "data", "どの主記憶ブロックも任意のキャッシュ位置へ置ける", []],
  ["04_haru-13", "ホットスタンバイ", "待機系を常に稼働状態にしておき、障害時にすぐ切り替えられるようにする方式。", "contingency", "待機系を温めておき即切替えする", []],
  ["04_haru-18", "フラグメンテーション", "メモリやディスクの空き領域が細かく分断され、連続領域を確保しにくくなる状態。", "data", "空き領域が細切れになる", []],
  ["04_haru-25", "レイトレーシング法", "光線の反射や屈折を追跡し、写実的な画像を生成するCG描画手法。", "system", "光線を追跡してリアルに描く", []],
  ["04_haru-26", "CAP定理", "分散データベースでは、一貫性、可用性、分断耐性の三つを同時に完全には満たせないという定理。", "data", "C・A・Pは三つ同時に完全達成できない", []],
  ["04_haru-27", "3層スキーマモデル", "外部スキーマ、概念スキーマ、内部スキーマに分けて、利用者視点、論理構造、物理構造を整理するDBモデル。", "data", "外部・概念・内部の3層でDBを見る", []],
  ["04_haru-29", "undo/redo", "障害回復で、未完了トランザクションは取り消し、完了済みトランザクションは再実行して整合性を戻す方式。", "data", "未完了は戻し、完了済みはやり直す", []],
  ["04_haru-30", "データマイニング", "大量データから、有用な規則性、傾向、関係を発見する分析手法。", "association", "大量データから隠れた規則を掘り出す", []],
  ["04_haru-32", "PPPoE", "Ethernet上でPPPを利用し、認証やIPアドレス割当てを行うためのプロトコル。", "system", "Ethernet上でPPP接続する", ["PPP over Ethernet"]],
  ["04_haru-35", "OpenFlow", "SDNで用いられるプロトコルの一つ。コントローラがスイッチの転送制御を行う。", "sdn", "SDNで転送ルールを外から制御する", []],
  ["04_haru-38", "チャレンジレスポンス方式", "サーバが提示した乱数などのチャレンジに対し、利用者側が秘密情報を用いて応答し認証する方式。", "trust", "秘密を直接送らず応答で証明する", []],
  ["04_haru-41", "シングルサインオン", "一度の認証で複数のシステムやサービスを利用できるようにする仕組み。", "saml", "一度ログインして複数サービスを使う", ["SSO"]],
  ["04_haru-44", "VDI", "利用者のデスクトップ環境をサーバ側で実行し、端末には画面転送して利用する仕組み。", "system", "デスクトップをサーバ側で動かす", ["Virtual Desktop Infrastructure"]],
  ["04_haru-51", "EVM", "計画価値、出来高、実コストを使って、プロジェクトの進捗とコストを統合的に管理する手法。", "cycle", "出来高で進捗とコストを同時に見る", ["アーンドバリューマネジメント"]],
  ["04_haru-57", "データ管理者", "データの定義、品質、整合性、利用ルールなどを管理し、データ資源を適切に保つ役割。", "data", "データの品質とルールを管理する", []],
  ["04_haru-60", "監査証拠", "監査人が意見や結論を形成するために入手し評価する情報。十分かつ適切であることが求められる。", "auditPaper", "監査結論の根拠になる情報", []],
  ["04_haru-63", "BPO", "自社業務の一部または全部を、外部の専門事業者へ委託すること。", "cycle", "業務プロセスを外部委託する", ["Business Process Outsourcing"]],
  ["04_haru-69", "バイラルマーケティング", "利用者の口コミや紹介によって情報が広がることを狙うマーケティング手法。", "strategy", "口コミで広がるように仕掛ける", []],
  ["04_haru-71", "XBRL", "財務情報をタグ付けして、企業間やシステム間で比較・再利用しやすくするXMLベースの標準。", "data", "財務情報にタグを付けて扱いやすくする", []],
  ["04_haru-72", "かんばん方式", "後工程が必要な物を必要な時に前工程へ指示し、在庫を抑えて生産する方式。", "cycle", "後工程が必要分だけ引き取る", []],
  ["04_haru-74", "ファシリテータ", "会議や活動が円滑に進むよう、中立的に進行を支援し参加者の発言や合意形成を促す役割。", "cycle", "議論を中立に進める支援役", []],
  ["04_haru-75", "PM理論", "リーダーシップを目標達成機能Pと集団維持機能Mの二つの軸で捉える理論。", "strategy", "成果Pと人間関係Mの二軸で見る", []],
  ["04_haru-78", "不正アクセス禁止法", "他人のID・パスワードの無断使用や、アクセス制御を回避して不正にアクセスする行為などを規制する法律。", "security", "他人の認証情報で勝手に入る行為を規制する", []],
];

const rawById = new Map(rawCards.map((card) => [card.id, card]));
const cards = curatedSpecs.map(([id, answer, text, visual, memory, aliases]) => {
  const raw = rawById.get(id);
  if (!raw) throw new Error(`Missing source card: ${id}`);
  return {
    ...raw,
    answer,
    text,
    visual,
    memory,
    aliases: [answer, ...(aliases || [])],
  };
});

let progress = JSON.parse(localStorage.getItem(stateKey) || "{}");
let filtered = cards.slice();
let currentIndex = 0;
let mode = "quiz";

const $ = (id) => document.getElementById(id);
const els = {
  examFilter: $("examFilter"),
  domainFilter: $("domainFilter"),
  categoryFilter: $("categoryFilter"),
  searchInput: $("searchInput"),
  weakOnly: $("weakOnly"),
  hideDone: $("hideDone"),
  visibleCount: $("visibleCount"),
  quizView: $("quizView"),
  learnView: $("learnView"),
  listView: $("listView"),
  diagram: $("diagram"),
  cardExam: $("cardExam"),
  cardQno: $("cardQno"),
  cardCategory: $("cardCategory"),
  questionText: $("questionText"),
  answerInput: $("answerInput"),
  feedback: $("feedback"),
  learnContent: $("learnContent"),
  cardList: $("cardList"),
  rightCount: $("rightCount"),
  weakCount: $("weakCount"),
  totalCount: $("totalCount"),
  scoreRing: $("scoreRing"),
};

function normalize(value) {
  return value
    .toLowerCase()
    .replace(/[Ａ-Ｚａ-ｚ０-９]/g, (s) => String.fromCharCode(s.charCodeAt(0) - 0xfee0))
    .replace(/[\s　・ー\-_/()（）.]/g, "");
}

function esc(value) {
  return String(value).replace(/[&<>"']/g, (s) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[s]));
}

const easyReplacements = [
  ["インフラ構成", "サーバやネットワークの設定"],
  ["実行環境", "動かすための環境"],
  ["再現", "再作成"],
  ["変更管理", "変更を記録して管理すること"],
  ["複数スレッド", "複数の処理"],
  ["不整合", "食い違い"],
  ["共有データ", "みんなで使うデータ"],
  ["リレーショナル表", "行と列の表"],
  ["仮想表", "実体はないが表のように見えるもの"],
  ["参照整合性", "関連するデータのつじつま"],
  ["同時実行制御", "同時に使っても矛盾しない仕組み"],
  ["バックエンド", "裏側のサーバ"],
  ["TLS終端", "暗号通信を入口でほどく処理"],
  ["冗長リンク", "予備の通信経路"],
  ["論理的に", "仕組み上"],
  ["木構造", "枝分かれした形"],
  ["認証局", "証明書を発行する機関"],
  ["失効", "無効になること"],
  ["脆弱性", "弱点"],
  ["ポリシー違反", "ルール違反"],
  ["暗号化して", "読めない形にして"],
  ["暗号化する", "読めない形にする"],
  ["暗号化し", "読めない形にし"],
  ["復旧の対価", "元に戻す見返り"],
  ["誤り検出方式", "誤りを見つける方式"],
  ["誤り検出", "誤りを見つけること"],
  ["検出する", "見つける"],
  ["継続的に", "定期的に"],
  ["権限過多", "権限を与えすぎている状態"],
  ["検出", "見つけること"],
  ["管理手法", "管理のやり方"],
  ["利用不能", "使えない状態"],
  ["復旧", "元に戻すこと"],
  ["対価", "見返り"],
  ["マルウェア", "悪意のあるソフト"],
  ["暗号化", "読めない形に変えること"],
  ["暗号", "読めない形にする技術"],
  ["復号", "読める形に戻すこと"],
  ["証拠性", "証拠として使える状態"],
  ["保全", "壊さず保存すること"],
  ["解析", "中身を調べること"],
  ["インシデント", "事故や問題"],
  ["要件定義", "何を作るか決める工程"],
  ["ネイティブアプリ", "スマホなどに入れて使うアプリ"],
  ["成熟", "チームがうまく動けるようになること"],
  ["期待値", "確率を含めた平均的な見込み"],
  ["意思決定", "どれを選ぶか決めること"],
  ["疎結合", "互いの影響が少ないつなぎ方"],
  ["アーキテクチャ", "全体の作り"],
  ["併売", "一緒に売れやすいこと"],
  ["ライフサイクル", "始まりから終わりまでの流れ"],
  ["実績収集", "実際に行った結果を集めること"],
  ["低消費電力", "少ない電力で動くこと"],
  ["水平分散", "台数を増やして処理を分けること"],
  ["平衡二分探索木", "左右の高さをそろえた探しやすい木"],
  ["入出力装置", "キーボードやディスクなど外部とやり取りする装置"],
  ["主記憶", "メインメモリ"],
  ["一意なID", "他と重ならない番号"],
  ["機械可読", "コンピュータが読みやすい形"],
  ["クライアント生成", "利用側のプログラムを自動で作ること"],
  ["バイナリデータ", "画像やファイルなど文字だけではないデータ"],
  ["副次情報", "本筋ではない横から漏れる情報"],
  ["秘密情報", "外に出してはいけない情報"],
  ["オンラインで問い合わせる", "ネット経由で確認する"],
  ["部品表", "使っている部品の一覧"],
  ["総当たり攻撃", "候補を片っ端から試す攻撃"],
  ["反復", "短い周期で繰り返すこと"],
  ["主要な要求事項", "大事な要求"],
  ["資源", "サーバやアカウントなど使うもの"],
  ["相対的市場シェア", "競合と比べた市場での強さ"],
  ["価値提案", "顧客に何をうれしく提供するか"],
  ["行動特性", "行動のくせや特徴"],
  ["汎化性能", "初めて見るデータにも当てはまる力"],
  ["被演算子", "計算される数や値"],
  ["不揮発性", "電源を切っても消えない性質"],
  ["トランザクション", "ひとまとまりの処理"],
  ["名前解決", "名前からIPアドレスを調べること"],
  ["オープンリゾルバ", "誰からのDNS問い合わせにも答えるDNSサーバ"],
  ["アサーション", "認証できたことを示す情報"],
  ["シングルサインオン", "一度のログインで複数サービスを使う仕組み"],
  ["漏えい", "外に漏れること"],
  ["共通識別子", "共通で使う番号"],
  ["改ざん", "勝手に書き換えること"],
  ["実行コード", "実際に動くプログラム"],
  ["独立サービス", "それぞれ単独で動かせる小さなサービス"],
  ["階層分解", "上から下へ細かく分けること"],
  ["作業パッケージ", "具体的な作業の単位"],
  ["恒久対策", "一時しのぎではない対策"],
  ["全体最適", "一部だけでなく全体として良くすること"],
  ["双子", "そっくりに再現したもの"],
  ["個別化", "人や注文ごとに変えること"],
  ["均衡", "つり合った状態"],
  ["XMLベース", "XMLという書き方を元にした"],
  ["温室効果ガス", "地球温暖化につながるガス"],
  ["外部委託", "外の会社に任せること"],
  ["成果物", "作って渡すもの"],
  ["除外事項", "やらないこと"],
  ["事前計算", "先に計算しておくこと"],
  ["公開鍵暗号", "公開する鍵と秘密の鍵を使う暗号"],
  ["署名を検証", "本物かどうか確認する"],
  ["統合開発環境", "開発道具がまとまった環境"],
  ["単発・短期", "一回だけ、または短い期間の"],
  ["環境に応じて", "状況に合わせて"],
  ["リスクベース認証", "危なさに応じて本人確認を強める仕組み"],
  ["サブミッション", "送信のための投稿"],
  ["匿名で意見", "名前を出さずに意見"],
  ["委任", "任せること"],
  ["対応関係", "どれとどれがつながるか"],
  ["因果関係", "原因と結果のつながり"],
  ["微小なエネルギー", "とても小さなエネルギー"],
  ["帯電した粒子", "電気を帯びた小さな粒"],
  ["固定長", "決まった長さ"],
  ["原子性", "途中で半端に終わらないこと"],
  ["一貫性", "データのつじつまが合うこと"],
  ["独立性", "同時処理がお互いを乱さないこと"],
  ["永続性", "完了した結果が消えないこと"],
  ["DDoS攻撃", "大量アクセスでサービスを止める攻撃"],
  ["頂上", "一番上"],
  ["故障原因", "壊れた原因"],
  ["リファクタリング", "動きを変えずにコードを整理すること"],
  ["前後関係", "どの作業が先か後か"],
  ["早期復旧", "早く元に戻すこと"],
  ["財務", "お金や会計"],
  ["法務", "法律まわり"],
  ["顧客選好", "顧客の好み"],
  ["成熟度", "どれくらい任せられる状態か"],
  ["再入可能", "同時に呼び出しても安全に動ける"],
  ["競合", "ぶつかり合い"],
  ["障害時", "故障や問題が起きたとき"],
  ["分断耐性", "ネットワークが切れても動き続ける性質"],
  ["概念スキーマ", "データ全体の論理的な形"],
  ["内部スキーマ", "実際の保存のされ方"],
  ["外部スキーマ", "利用者ごとの見え方"],
  ["未完了", "まだ終わっていない"],
  ["完了済み", "もう終わった"],
  ["認証", "本人確認"],
  ["認証情報", "ログインに必要な情報"],
  ["仮想記憶", "メモリを大きく見せる仕組み"],
];

function easyText(value) {
  let result = String(value);
  for (const [hard, easy] of easyReplacements) {
    result = result.split(hard).join(easy);
  }
  return result;
}

function fillSelect(select, values, allLabel) {
  select.innerHTML = `<option value="">${allLabel}</option>` + values.map((v) => `<option>${esc(v)}</option>`).join("");
}

function initFilters() {
  fillSelect(els.examFilter, [...new Set(cards.map((c) => c.exam))], "すべて");
  fillSelect(els.domainFilter, [...new Set(cards.map((c) => c.domain))], "すべて");
  fillSelect(els.categoryFilter, [...new Set(cards.map((c) => c.category))].sort(), "すべて");
}

function isRight(card) { return progress[card.id]?.right; }
function isWeak(card) { return progress[card.id]?.weak; }

function saveProgress() {
  localStorage.setItem(stateKey, JSON.stringify(progress));
  renderStats();
}

function applyFilters() {
  const query = normalize(els.searchInput.value);
  filtered = cards.filter((card) => {
    if (els.examFilter.value && card.exam !== els.examFilter.value) return false;
    if (els.domainFilter.value && card.domain !== els.domainFilter.value) return false;
    if (els.categoryFilter.value && card.category !== els.categoryFilter.value) return false;
    if (els.weakOnly.checked && !isWeak(card)) return false;
    if (els.hideDone.checked && isRight(card)) return false;
    if (query && !normalize(`${card.answer}${card.topic}${card.category}${card.text}`).includes(query)) return false;
    return true;
  });
  currentIndex = Math.min(currentIndex, Math.max(0, filtered.length - 1));
  els.visibleCount.textContent = filtered.length;
  render();
}

function currentCard() {
  return filtered[currentIndex] || cards[0];
}

function svgCard(inner, extraClass = "") {
  return `<svg class="ap-svg ${extraClass}" viewBox="0 0 720 260" role="img" aria-label="用語の図解"><defs><marker id="arrowhead" markerWidth="10" markerHeight="8" refX="9" refY="4" orient="auto"><path d="M0,0 L10,4 L0,8 Z" fill="#d95f43" stroke="none"></path></marker></defs>${inner}</svg>`;
}

function box(x, y, w, h, label, cls = "") {
  return `<rect class="${cls}" x="${x}" y="${y}" width="${w}" height="${h}" rx="14"></rect><text x="${x + w / 2}" y="${y + h / 2}" text-anchor="middle" dominant-baseline="middle">${esc(label)}</text>`;
}

function cyl(x, y, w, h, label, cls = "") {
  return `<path class="${cls}" d="M${x},${y + 18} C${x},${y - 2} ${x + w},${y - 2} ${x + w},${y + 18} V${y + h - 18} C${x + w},${y + h + 2} ${x},${y + h + 2} ${x},${y + h - 18} Z"></path><ellipse class="${cls}" cx="${x + w / 2}" cy="${y + 18}" rx="${w / 2}" ry="18"></ellipse><text x="${x + w / 2}" y="${y + h / 2 + 8}" text-anchor="middle">${esc(label)}</text>`;
}

function arrow(x1, y1, x2, y2, cls = "") {
  return `<line class="svg-arrow ${cls}" x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}"></line>`;
}

function visualFamily(visual) {
  if (["trust", "security", "data", "system", "strategy", "cycle", "mechanism"].includes(visual)) return visual;
  if (["crl", "ocsp", "dnssec", "secureCookie", "spf", "saml", "threeDS", "3ds"].includes(visual)) return "trust";
  if (["reverseProxy", "waf", "cspm", "commandInjection", "sideChannel", "dnsPoison", "passwordList", "exploit", "forensics", "psirt", "sbom", "cve"].includes(visual)) return "security";
  if (["nosql", "view", "mvcc", "objectStorage", "checkpoint", "storedProcedure", "coalesce", "starSchema", "dns"].includes(visual)) return "data";
  if (["iac", "provisioning", "sdn", "edge", "digitalTwin", "pwa", "openapi", "docGenerator", "soa", "microservice", "fiberChannel"].includes(visual)) return "system";
  if (["ansoff", "ppm", "canvas", "association", "decisionTree", "gameTheory", "nash", "fishbone", "competency"].includes(visual)) return "strategy";
  if (["plm", "mes", "scm", "tuckman", "xp", "lean", "followup", "ghg", "auditPaper", "contingency", "ea", "cocreation", "massCustomization"].includes(visual)) return "cycle";
  return "mechanism";
}

function clueLabel(card, family) {
  const visual = card.visual;
  if (visual === "crc") return "余りチェック";
  if (visual === "sideChannel") return "横から漏れる情報";
  if (visual === "stp") return "ループを止める";
  if (visual === "fishbone") return "原因を整理";
  if (["crl", "ocsp"].includes(visual)) return "失効を確認";
  if (["dnssec", "spf", "secureCookie", "saml", "threeDS", "3ds"].includes(visual)) return "本物か確認";
  if (["waf", "cspm", "forensics", "psirt", "sbom", "cve"].includes(visual)) return "守る・調べる";
  if (["commandInjection", "dnsPoison", "passwordList", "exploit"].includes(visual)) return "攻撃の型";
  if (visual === "view") return "仮想の見せ方";
  if (visual === "mvcc") return "複数の版";
  if (visual === "starSchema") return "分析用の表";
  if (visual === "objectStorage") return "IDで保存";
  if (visual === "coalesce") return "NULLを避ける";
  if (visual === "storedProcedure") return "DB内の処理";
  if (visual === "checkpoint") return "復旧地点";
  if (["iac", "provisioning"].includes(visual)) return "環境を用意";
  if (visual === "sdn") return "通信を制御";
  if (visual === "edge") return "近くで処理";
  if (visual === "digitalTwin") return "現実の写し";
  if (visual === "openapi") return "API仕様";
  if (visual === "docGenerator") return "文書を生成";
  if (family === "strategy") return "分類の型";
  if (family === "cycle") return "流れの中心";
  if (family === "data") return "データの仕組み";
  if (family === "system") return "動かす仕組み";
  if (family === "trust") return "信用の確認";
  if (family === "security") return "守る仕組み";
  return "働き";
}

function diagramV2(card, reveal = false) {
  const memory = esc(easyText(card.memory));
  const visual = card.visual;
  const family = visualFamily(visual);
  const answer = esc(reveal ? card.answer : clueLabel(card, family));
  const headTitle = esc(reveal ? card.answer : "図で覚えるポイント");
  const head = `<div class="visual-head"><span class="visual-kind">${esc(card.category)}</span><strong>${headTitle}</strong><p>${memory}</p></div>`;

  if (visual === "crc") {
    return `<div class="memory-visual crc-visual">${head}<div class="crc-board">
      <div class="bit-row"><span>1</span><span>0</span><span>1</span><span>1</span><span>0</span><span>1</span></div>
      <div class="division-mark">割る</div>
      <div class="poly-card">生成多項式</div>
      <div class="remainder-card">余りを付ける</div>
      <div class="error-spark">不一致なら誤り</div>
    </div></div>`;
  }

  if (visual === "sideChannel") {
    return `<div class="memory-visual side-channel">${head}<div class="device-scene">
      <div class="chip">暗号処理</div>
      <div class="leak leak-time">処理時間</div>
      <div class="leak leak-power">消費電力</div>
      <div class="leak leak-wave">電磁波</div>
      <div class="attacker-eye">観測</div>
    </div></div>`;
  }

  if (visual === "stp") {
    return `<div class="memory-visual topology">${head}<div class="switch-net">
      <span class="sw n1">SW</span><span class="sw n2">SW</span><span class="sw n3">SW</span>
      <span class="net-line l12"></span><span class="net-line l23"></span><span class="net-line l31 blocked"></span>
      <span class="blocked-label">ここを止める</span>
    </div></div>`;
  }

  if (visual === "fishbone") {
    return `<div class="memory-visual fishbone">${head}<div class="fish">
      <span class="spine"></span><span class="head-label">結果</span>
      <span class="bone b1">人</span><span class="bone b2">方法</span><span class="bone b3">設備</span><span class="bone b4">材料</span>
    </div></div>`;
  }

  if (family === "trust") {
    return `<div class="memory-visual trust-visual">${head}<div class="trust-scene">
      <div class="cert-doc">証明書</div><div class="stamp">${answer}</div><div class="trust-meter"><span></span><b>信用できるか判定</b></div>
    </div></div>`;
  }

  if (family === "security") {
    return `<div class="memory-visual security-visual">${head}<div class="security-scene">
      <div class="threat-dot">脅威</div><div class="shield-card">${answer}</div><div class="asset-stack"><span></span><span></span><b>守る対象</b></div>
    </div></div>`;
  }

  if (family === "data") {
    return `<div class="memory-visual data-visual">${head}<div class="data-scene">
      <div class="table-sheet"><i></i><i></i><i></i></div><div class="db-cylinder">${answer}</div><div class="doc-pile"><span></span><span></span><span></span></div>
    </div></div>`;
  }

  if (family === "system") {
    return `<div class="memory-visual system-visual">${head}<div class="system-scene">
      <div class="code-page">仕様<br>コード</div><div class="gear-core">${answer}</div><div class="cloud-nodes"><span></span><span></span><span></span></div>
    </div></div>`;
  }

  if (family === "strategy") {
    return `<div class="memory-visual strategy-visual">${head}<div class="strategy-scene">
      <div class="matrix-card"><span>軸A</span><span>軸B</span><span>比較</span><strong>${answer}</strong></div>
      <div class="decision-chip">選択肢を分類</div>
    </div></div>`;
  }

  if (family === "cycle") {
    return `<div class="memory-visual cycle-visual">${head}<div class="cycle-scene">
      <span>計画</span><span>実行</span><strong>${answer}</strong><span>確認</span><span>改善</span>
    </div></div>`;
  }

  return `<div class="memory-visual mechanism-visual">${head}<div class="mechanism-scene">
    <div class="signal-dial">入力</div><div class="core-badge">${answer}</div><div class="result-dial">結果</div>
  </div></div>`;
}

function diagram(card) {
  const a = esc(card.answer);
  const m = esc(card.memory);
  const visual = card.visual;
  if (["crl", "ocsp", "dnssec", "secureCookie", "spf"].includes(visual)) {
    return svgCard(`
      ${box(36, 72, 150, 88, "利用者", "soft")}
      ${box(285, 42, 150, 58, "証明書 / DNS", "accent")}
      ${box(285, 142, 150, 58, a, "warn")}
      ${box(535, 72, 150, 88, "信頼判定", "good")}
      ${arrow(186, 116, 285, 78)}${arrow(435, 78, 535, 116)}${arrow(435, 172, 535, 126)}
      <text class="svg-note" x="360" y="236" text-anchor="middle">${m}</text>`, "trust");
  }
  if (["reverseProxy", "waf", "cspm", "commandInjection", "sideChannel", "dnsPoison", "passwordList", "exploit", "forensics"].includes(visual)) {
    return svgCard(`
      ${box(34, 76, 130, 82, "外部", "soft")}
      ${box(238, 54, 190, 126, a, "warn")}
      ${box(560, 46, 120, 58, "サーバ", "good")}
      ${box(560, 150, 120, 58, "ログ/設定", "good")}
      ${arrow(164, 117, 238, 117)}${arrow(428, 98, 560, 76)}${arrow(428, 142, 560, 178)}
      <path class="shield" d="M333 70 L388 88 V123 C388 151 368 168 333 181 C298 168 278 151 278 123 V88 Z"></path>
      <text class="shield-text" x="333" y="128" text-anchor="middle">${a}</text>
      <text class="svg-note" x="360" y="236" text-anchor="middle">${m}</text>`, "security");
  }
  if (["nosql", "view", "mvcc", "objectStorage", "checkpoint", "storedProcedure", "coalesce", "starSchema"].includes(visual)) {
    const center = visual === "starSchema" ? "ファクト表" : a;
    return svgCard(`
      ${cyl(282, 50, 156, 154, center, "db-main")}
      ${box(54, 46, 138, 58, visual === "view" ? "実表" : "アプリ", "soft")}
      ${box(54, 154, 138, 58, visual === "mvcc" ? "旧版" : "入力", "soft")}
      ${box(528, 46, 138, 58, visual === "starSchema" ? "商品次元" : "結果", "good")}
      ${box(528, 154, 138, 58, visual === "starSchema" ? "顧客次元" : "保存", "good")}
      ${arrow(192, 76, 282, 98)}${arrow(192, 184, 282, 152)}${arrow(438, 98, 528, 76)}${arrow(438, 152, 528, 184)}
      <text class="svg-note" x="360" y="236" text-anchor="middle">${m}</text>`, "database");
  }
  if (["iac", "provisioning", "sdn", "edge", "digitalTwin", "pwa", "openapi", "docGenerator"].includes(visual)) {
    return svgCard(`
      ${box(40, 80, 135, 90, visual === "iac" ? "コード" : "仕様/データ", "accent")}
      ${box(272, 52, 176, 146, a, "soft")}
      ${box(548, 46, 130, 64, "実環境", "good")}
      ${box(548, 150, 130, 64, "利用者", "good")}
      ${arrow(175, 125, 272, 125)}${arrow(448, 94, 548, 78)}${arrow(448, 156, 548, 182)}
      <text class="svg-note" x="360" y="236" text-anchor="middle">${m}</text>`, "system");
  }
  if (["ansoff", "ppm", "canvas", "association", "decisionTree", "gameTheory", "nash", "fishbone", "competency"].includes(visual)) {
    return svgCard(`
      <rect class="matrix-bg" x="110" y="32" width="500" height="176" rx="14"></rect>
      <line class="matrix-line" x1="360" y1="32" x2="360" y2="208"></line>
      <line class="matrix-line" x1="110" y1="120" x2="610" y2="120"></line>
      <text class="axis" x="235" y="78" text-anchor="middle">既存 / 低</text>
      <text class="axis" x="485" y="78" text-anchor="middle">新規 / 高</text>
      <text class="axis" x="235" y="166" text-anchor="middle">分析</text>
      <text class="axis strong" x="485" y="166" text-anchor="middle">${a}</text>
      <text class="svg-note" x="360" y="236" text-anchor="middle">${m}</text>`, "matrix-diagram");
  }
  if (["plm", "mes", "scm", "tuckman", "xp", "lean", "followup", "ghg", "auditPaper", "contingency"].includes(visual)) {
    const labels = visual === "plm" ? ["企画", "設計", "製造", "保守", "廃棄"] :
      visual === "tuckman" ? ["形成", "混乱", "統一", "機能", "成果"] :
      visual === "scm" ? ["調達", "生産", "物流", "販売", "顧客"] :
      ["計画", "実行", a, "確認", "改善"];
    return svgCard(labels.map((label, i) => `${box(38 + i * 134, 84, 104, 74, label, i === 2 ? "accent" : "soft")}${i < 4 ? arrow(142 + i * 134, 121, 172 + i * 134, 121) : ""}`).join("") +
      `<text class="svg-note" x="360" y="236" text-anchor="middle">${m}</text>`, "lifecycle");
  }
  if (["thread", "lru", "thrashing", "dma", "avl", "soc", "actuator", "twoPhaseCommit", "csmacd", "lpwa"].includes(visual)) {
    return svgCard(`
      ${box(44, 52, 150, 58, "処理A", "soft")}
      ${box(44, 152, 150, 58, "処理B", "soft")}
      ${box(286, 78, 148, 106, a, "accent")}
      ${box(548, 52, 130, 58, "資源", "good")}
      ${box(548, 152, 130, 58, "結果", "good")}
      ${arrow(194, 80, 286, 110)}${arrow(194, 180, 286, 150)}${arrow(434, 110, 548, 80)}${arrow(434, 150, 548, 180)}
      <text class="svg-note" x="360" y="236" text-anchor="middle">${m}</text>`, "control");
  }
  if (["psirt", "sbom", "cve", "saml", "3ds", "threeDS", "cocreation", "massCustomization", "ea", "soa", "microservice"].includes(visual)) {
    return svgCard(`
      ${box(72, 74, 130, 82, "要求/報告", "soft")}
      ${box(286, 42, 150, 70, a, "accent")}
      ${box(286, 148, 150, 70, "調整", "warn")}
      ${box(520, 74, 130, 82, "提供/対応", "good")}
      ${arrow(202, 115, 286, 78)}${arrow(202, 115, 286, 182)}${arrow(436, 78, 520, 115)}${arrow(436, 182, 520, 115)}
      <text class="svg-note" x="360" y="236" text-anchor="middle">${m}</text>`, "coordination");
  }
  return svgCard(`
    ${box(54, 80, 150, 88, "手掛かり", "soft")}
    ${box(286, 58, 148, 132, a, "accent")}
    ${box(520, 80, 150, 88, "選択肢判定", "good")}
    ${arrow(204, 124, 286, 124)}${arrow(434, 124, 520, 124)}
    <text class="svg-note" x="360" y="236" text-anchor="middle">${m}</text>`, "generic");
}

function prompt(card) {
  return `${easyText(card.text)} この説明に当てはまる用語を答えてください。`;
}

function renderQuiz() {
  const card = currentCard();
  els.cardExam.textContent = card.exam;
  els.cardQno.textContent = `問${card.qno}`;
  els.cardCategory.textContent = card.category;
  els.diagram.innerHTML = diagramV2(card, false);
  els.questionText.textContent = prompt(card).replace(card.answer, "□□□");
  els.answerInput.value = "";
  els.feedback.className = "feedback";
  els.feedback.innerHTML = `採用理由: ${esc(easyText(card.memory))}。このカードは暗記で選択肢を切れる論点だけに絞っています。`;
  $("weakBtn").textContent = isWeak(card) ? "苦手解除" : "苦手";
}

function renderLearn() {
  const card = currentCard();
  els.learnContent.innerHTML = `
    <div class="card-meta">
      <span>${esc(card.exam)}</span><span>問${card.qno}</span><span>${esc(card.domain)}</span><span>${esc(card.category)}</span>
    </div>
    <div class="learn-grid">
      <div class="explain">
        <h2 class="learn-title">${esc(card.answer)}</h2>
        <p>${esc(easyText(card.text))}</p>
        <p><strong>こう覚える:</strong> ${esc(easyText(card.memory))}</p>
        <p><strong>出題の手掛かり:</strong> ${esc(card.topic)}</p>
        <p><a href="${card.url}" target="_blank" rel="noreferrer">元問題を開く</a></p>
      </div>
      <div class="diagram">${diagramV2(card, true)}</div>
    </div>`;
}

function renderList() {
  els.cardList.innerHTML = filtered.map((card, index) => `
    <div class="row-card">
      <span class="pill">${esc(card.exam)} 問${card.qno}</span>
      <div>
        <div class="row-title">${esc(card.answer)}</div>
        <div class="row-sub">${esc(easyText(card.memory))} / ${esc(card.category)}</div>
      </div>
      <button data-jump="${index}">開く</button>
    </div>
  `).join("") || `<p class="row-sub">条件に合うカードがありません。</p>`;
}

function renderStats() {
  const right = cards.filter(isRight).length;
  const weak = cards.filter(isWeak).length;
  const percent = Math.round((right / cards.length) * 100);
  els.rightCount.textContent = right;
  els.weakCount.textContent = weak;
  els.totalCount.textContent = cards.length;
  els.scoreRing.style.background = `conic-gradient(var(--accent) ${percent * 3.6}deg, #dfe7f0 0deg)`;
  els.scoreRing.querySelector("span").textContent = `${percent}%`;
}

function render() {
  els.quizView.classList.toggle("hidden", mode !== "quiz");
  els.learnView.classList.toggle("hidden", mode !== "learn");
  els.listView.classList.toggle("hidden", mode !== "list");
  if (mode === "quiz") renderQuiz();
  if (mode === "learn") renderLearn();
  if (mode === "list") renderList();
  renderStats();
}

function checkAnswer() {
  const card = currentCard();
  const answer = normalize(els.answerInput.value);
  const accepted = card.aliases.some((alias) => {
    const target = normalize(alias);
    return target === answer || (answer.length >= 3 && target.includes(answer));
  });
  progress[card.id] = { ...progress[card.id], right: accepted || progress[card.id]?.right, attempts: (progress[card.id]?.attempts || 0) + 1 };
  els.feedback.className = `feedback ${accepted ? "good" : "bad"}`;
  els.feedback.innerHTML = accepted
    ? `正解。答えは <strong>${esc(card.answer)}</strong> です。`
    : `答えは <strong>${esc(card.answer)}</strong>。${esc(easyText(card.memory))} と覚えると選択肢を切れます。`;
  saveProgress();
}

function revealAnswer() {
  const card = currentCard();
  els.feedback.className = "feedback";
  els.feedback.innerHTML = `答えは <strong>${esc(card.answer)}</strong>。${esc(easyText(card.text))}`;
}

function move(delta) {
  if (!filtered.length) return;
  currentIndex = (currentIndex + delta + filtered.length) % filtered.length;
  render();
}

function shuffle() {
  filtered.sort(() => Math.random() - 0.5);
  currentIndex = 0;
  render();
}

document.querySelectorAll(".mode-tabs button").forEach((button) => {
  button.addEventListener("click", () => {
    mode = button.dataset.mode;
    document.querySelectorAll(".mode-tabs button").forEach((b) => b.classList.toggle("active", b === button));
    render();
  });
});

["change", "input"].forEach((eventName) => {
  [els.examFilter, els.domainFilter, els.categoryFilter, els.searchInput, els.weakOnly, els.hideDone].forEach((el) => {
    el.addEventListener(eventName, applyFilters);
  });
});

$("checkBtn").addEventListener("click", checkAnswer);
$("revealBtn").addEventListener("click", revealAnswer);
$("nextBtn").addEventListener("click", () => move(1));
$("prevBtn").addEventListener("click", () => move(-1));
$("shuffleBtn").addEventListener("click", shuffle);
$("weakBtn").addEventListener("click", () => {
  const card = currentCard();
  progress[card.id] = { ...progress[card.id], weak: !isWeak(card) };
  saveProgress();
  render();
});
$("resetBtn").addEventListener("click", () => {
  if (!confirm("進捗をリセットしますか？")) return;
  progress = {};
  saveProgress();
  render();
});
els.answerInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") checkAnswer();
});
els.cardList.addEventListener("click", (event) => {
  const button = event.target.closest("[data-jump]");
  if (!button) return;
  currentIndex = Number(button.dataset.jump);
  mode = "learn";
  document.querySelectorAll(".mode-tabs button").forEach((b) => b.classList.toggle("active", b.dataset.mode === mode));
  render();
});

initFilters();
applyFilters();
