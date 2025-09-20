# Entain — 简要介绍（用于面试背景）
Entain 是全球领先的体育博彩与在线游戏集团，旗下在澳新地区运营的品牌包括 **Ladbrokes、neds、Entain Venues、TAB、betcha、Trackside 和 Sport Nation**，公司业务涵盖线上体育博彩、在线娱乐场、线下零售/场馆运营、赛事池（tote）产品与相关技术与合规服务。:contentReference[oaicite:0]{index=0}  
Entain 的运营重点既包括以数据与实时交易驱动的 **sportsbook（体育博彩）**，也包括场馆与线下渠道（Entain Venues / retail）以及公司层面的可持续与合规策略（见年报）。财务衡量常用指标包括 **GGR（Gross Gaming Revenue）** 与 **NGR（Net Gaming Revenue）** 等。:contentReference[oaicite:1]{index=1}  
在澳大利亚市场，税费与监管对运营结果影响显著（例如消费地税和市场费用会影响净收入），这是本地业务日常运作中需要关注的重要外部因素。:contentReference[oaicite:2]{index=2}

## 说明
- 下列术语按业务类别分组（产品/交易/财务/风控/市场/线下/技术/客服），每项包含：**英文术语 — 中文翻译**，后接详尽中文解释，便于面试快速引用与记忆。
- 我列出的为“常见且在 Entain 等大型运营商日常运营中最关键”的术语集合；如果你想要我把它压缩成一页面试速记卡或生成 Anki 卡片，我可以直接整理成便于背诵的格式。

## 术语表（按类）

### 一、产品与市场基础
- **Sportsbook — 体育博彩**:  
  体育赛事上接受固定赔率或其他形式（如pool/exchange）投注的产品线，包括赛前与赛中（in-play）市场，核心为赔率发布、风险控制与结算。
- **Fixed Odds — 固定赔率（定盘）**:  
  用户下注时赔率被锁定，若投注被接受，输赢按该赔率结算；庄家负责设定赔率并管理整体“overround”以保证长期盈利。
- **In-Play / Live Betting — 滚球/赛事中投注**:  
  比赛进行中可持续开出新市场和调整赔率，需实时数据与低延迟交易平台支持，是提高参与度和GGR的重要来源。
- **Pari-mutuel / Tote — 彩池/赛马池**:  
  彩池式投注（特别在赛马）将所有投注合并成池，去除玩家赢钱后的分配（按池中比例分配），庄家抽取手续费（takeout）；TAB 属于此类或与其相关的传统赛马服务。
- **Betting Exchange — 交易所**:  
  用户之间对赌（peer-to-peer），平台收取佣金而非设置赔率；特点是可作 lay（做庄）与 back（下注），流动性与撮合机制关键。
- **Casino / Online Casino — 在线娱乐场**:  
  包括老虎机（slots）、桌面游戏（黑杰克、轮盘）、真人荷官（live dealer）等，常用 RTP（Return to Player）衡量游戏长期回报率。
- **Virtuals — 虚拟体育**:  
  基于模拟或动画的短时赛事（虚拟足球/赛马等），用于填补真实赛事空档，带来稳定频率的投注机会。
- **Esports — 电竞博彩**:  
  针对电子竞技比赛的投注市场，涵盖比赛胜负、地图比分等，数据与规则差异较传统体育。

### 二、交易、定价与交易台（Trading）
- **Odds / Price — 赔率/价格**:  
  表示某一结果发生时的回报比率（如十进赔率、分数赔率等），对外展示并用于计算潜在盈利。
- **Odds Compiler / Price Compiler — 赔率编制器**:  
  负责初始赔率生成的人员或算法，会综合历史数据、实时信息、市场走势与对手价格来定价。
- **Trader — 交易员**:  
  负责实时监控市场、调整赔率、对冲风险并控制敞口（exposure）；大型运营商用自动化系统 + 人工审阅混合作业。
- **Liability / Exposure — 敞口/责任**:  
  在某一市场/选择上，如果所有投注都成真，公司需支付的潜在最大损失；交易员通过调整赔率或对冲操作管理敞口。
- **Hedging — 对冲**:  
  为控制敞口或锁定利润而在其他市场/平台上下反向注单或使用交易所/第三方工具进行风险转移。
- **Overround / Bookmaker Margin — 超额概率/庄家利润率**:  
  将所有结果赔率换算为概率后之和超过100%的部分，表示庄家内置的理论边际（用于长期盈利）。:contentReference[oaicite:3]{index=3}
- **Lay Betting — 做庄/反向下注（在交易所）**:  
  在交易所上“卖出”一个结果，等同于在传统庄家的相反角色上承担责任；需要对冲和资金准备。
- **Market Liquidity — 市场流动性**:  
  市场上可被匹配的挂单量；流动性高有利于大额下注和低滑点（slippage）。

### 三、注单与结算
- **Bet / Wager — 注单/投注**:  
  用户提交的风险行为，含投注额（stake）、市场与选择（selection）信息。
- **Stake — 投注额（本金）**:  
  用户为该注单投入的金额，输赢均以此为基准计算。
- **Bet Slip / Ticket — 注单/票据**:  
  用户界面生成的投注确认文件，包含市场、选择、赔率、投注额与潜在回报。
- **Settlement — 结算**:  
  事件结果确认后，按赔率支付赢者并回收输者本金/更新玩家钱包；若事件被取消或按规则视为无效则进行 void。
- **Void Bet — 无效注**:  
  因赛事取消、规则冲突或系统错误等原因，注单被判为无效并退回本金。
- **Cashout / Early Payout — 提前结算/现金结算**:  
  在赛事未结束前，平台提供提前结算选项以锁定部分盈利或减少损失；价格由平台根据当前敞口与市场变化计算。
- **Partial Cashout — 部分提前结算**:  
  允许用户只结算注单的一部分金额，另一部分保持原注。
- **Ticket Status / Rollback — 注单状态/回滚**:  
  注单可能为 pending/accepted/settled/void/refunded 等状态；系统问题时可能需要回滚（rollback）事务并人工复核。

### 四、财务与关键指标
- **GGR — Gross Gaming Revenue（总博彩收入）**:  
  通常定义为玩家投注总额减去玩家赢取的总额（不扣除奖金、费用、税等）；运营层面常用来衡量产品规模。:contentReference[oaicite:4]{index=4}
- **NGR — Net Gaming Revenue（净博彩收入）**:  
  在 GGR 基础上再扣除促销成本（bonus）、支付手续费、税费与退款等，更能反映可分配/可税收的收入。
- **Hold % / Win Rate（留存率/持有率）**:  
  GGR 与投注总额之比，表明在一段时期内公司“留住”的比例（影响短期利润）。
- **Turnover / Handle（投注额/成交额）**:  
  指一定周期内累计的玩家投注总额（用于分析活跃度与频率）。
- **ARPU / ARPPU — 平均用户收益 / 付费用户平均收益**:  
  衡量单个活跃用户（或付费用户）带来的平均收入，对客户分层与投放 ROI 分析重要。
- **UAC / Active Customers — 活跃用户数/独立活跃账户**:  
  一定周期内产生投注或互动的独立账户数，是衡量规模和市场渗透的核心指标。
- **LTV — Customer Lifetime Value（客户生命周期价值）**:  
  预测单个客户在其关系周期内将为公司带来的净收益，用于决定可承受的 CAC（获客成本）。
- **CAC / CPA — 客户获取成本 / 按行为付费（Cost per Acquisition）**:  
  衡量通过市场渠道获取一个新客户所需成本（用于营销预算与渠道评估）。
- **RTP — Return to Player（玩家回报率，常用于 Casino）**:  
  长期平均下玩家会获得的赔付比例（例如某老虎机的RTP为96%）。

### 五、风控、合规与责任博彩（RG）
- **KYC — Know Your Customer（了解你的客户）**:  
  身份核查流程（身份证、地址、风险问卷等），用于防止未成年人、账户滥用与洗钱风险。
- **AML — Anti-Money Laundering（反洗钱）**:  
  监测异常资金流、可疑交易和报送可疑活动报告（SAR）给监管机构的合规体系。
- **Self-Exclusion — 自我排除**:  
  玩家主动申请在一定时间内禁止访问账户与投注，运营商必须执行并在多个平台/品牌间共享（若合规要求）。
- **Deposit / Loss Limits — 存款/损失限额**:  
  玩家或平台设置的金额/频率限制，用于控制过度赌博风险。
- **Reality Check / Session Time Limits — 实时提醒/会话时限**:  
  平台提供的时长提醒或强制性暂停功能，提升责任博彩保护。
- **Regulatory License — 运营牌照**:  
  在不同司法区（UKGC、MGA、澳洲各州监管机构等）申请并遵守的许可证与条件，是日常合规操作的基础。:contentReference[oaicite:5]{index=5}
- **Affordability Checks — 支付能力核验**:  
  对高额玩家进行收入/负债评估，防止超出承受能力的投注行为。

### 六、市场与促销（Marketing & CRM）
- **Acquisition Channels — 获客渠道**:  
  搜索、社媒、展示广告、联盟（affiliate）、电视/广播、线下门店等；渠道成本差异大，常按 CPA/ROI 评估。
- **Affiliate — 联盟营销**:  
  第三方网站/个人通过引流获取客户并按转化或净收入分成，是博彩行业重要获客方式。
- **Bonus / Free Bet — 奖金/免费注金**:  
  常见促活或获客手段（例如首存赠送、免费注），但涉及 wagering requirement（投注流水）与合规披露。
- **Wagering Requirement — 投注流水/投注要求**:  
  奖金兑现前要求玩家在平台上投注的倍数（例如奖金需 x 重投注），用于防止立即提现套利。
- **Matched Betting — 对冲套利（玩家行为）**:  
  玩家利用书商优惠与交易所对冲风险以实现近乎无风险收益，运营商需通过规则与风控减少滥用。
- **Odds Boost / Enhanced Odds — 提升赔率/特别赔率**:  
  营销促销形式，短期提升某一市场赔率以吸引投注。

### 七、线下与场馆（Retail & Venues）
- **Retail / Betting Shop — 线下门店/投注点**:  
  实体店面提供柜台投注、自助终端、实体客户服务与品牌曝光，是 Entain 在部分市场的重要补充渠道。
- **Betting Terminal / Kiosk — 投注终端/自助机**:  
  线下设备用于接受注单与打印票据，常与中央系统实时连通。
- **Entain Venues — 场馆业务**:  
  公司在本地运营的体育酒吧、赛马场合作点或其他线下场所，负责现场体验与线下收入（例如直播观赛、餐饮、博彩服务）。
- **Tote Window — 彩池窗口（赛马场）**:  
  线下展示和运营赛马/赛狗等彩池产品的接口与收银点。

### 八、技术与平台
- **Platform / iGaming Platform — 平台/技术栈**:  
  支撑前端、交易引擎、风控、结算、支付与报表的整体软件架构；大型运营商常自研或混合多厂商解决方案。
- **Bet Engine — 注单引擎**:  
  负责接受注单、验证、锁定赔率、写入事务并送入结算队列的核心组件，要求高并发与高可用。
- **Odds Feed / Data Feed — 数据流/赔率流**:  
  实时体育数据（比赛事件、比分、赛程）与第三方赔率流是 in-play 与编价的基础。
- **Latency — 延迟**:  
  系统从数据到展示/接受注单的时间，特别在 in-play 场景下延迟直接影响风险与盈利。
- **API — 应用程序接口**:  
  对外或内部服务间交互的程序接口，常用于第三方整合、白标合作与 B2B 服务。
- **Back Office — 后台管理系统**:  
  包括资金对账、风控规则引擎、报表、客服工具与合规模块，是日常运营管理中心。
- **White-label — 白标方案**:  
  提供基础平台和品牌定制化的商务模式，合作伙伴可借用平台快速上线。

### 九、支付与结算（Payments）
- **PSP — Payment Service Provider（支付服务商）**:  
  第三方提供银行卡、电子钱包、即时支付等接入与清算服务，影响到账速度与手续费。
- **E-wallet — 电子钱包**:  
  PayPal、Skrill、Neteller 等第三方钱包，常用于快速存取款与用户分层管理。
- **Chargeback — 退单/争议扣款**:  
  用户或发卡行对交易发起争议导致的回滚与损失，需要结算/合规团队处理。
- **Reconciliation — 账务对账**:  
  每日/周期性核对玩家交易、平台流水与 PSP 报表以保证账面一致。

### 十、客服与运营
- **Customer Support / Ops — 客服与运营**:  
  处理注单争议、支付问题、账户验证、责任博彩请求与技术故障，是维持用户信任的关键职能。
- **SLA — Service Level Agreement（服务级别协议）**:  
  对内/对外定义的响应时间与处理质量标准（例如大额提款审核时间、客服首次响应时间）。
- **KPI / OKR — 关键绩效指标**:  
  团队/岗位衡量目标的常用工具，例如 NGR 增长、活跃用户、首次存款转化率等。

---

## 面试使用建议（快速记忆）
- 在面试中谈论产品时，用「**如何赚钱**（赔率 + overround + hold%）」「**如何控制风险**（trader + hedging + exposure）」「**如何合规与保护玩家**（KYC/AML/自我排除）」三条线展开，会显得结构清晰且贴合运营实务。:contentReference[oaicite:6]{index=6}
- 若被问到财务或市场影响，引用 **GGR vs NGR** 的差异来说明促销/税费如何影响净利。:contentReference[oaicite:7]{index=7}

## 参考与延伸阅读（我在下面两处资料上验证了关键定义与公司品牌信息）
- Entain — Our brands / Australia & NZ brand page. :contentReference[oaicite:8]{index=8}  
- Entain Annual Report / Strategy（公司对线上/场馆与合规的策略说明）。:contentReference[oaicite:9]{index=9}  
- 赔率与 Overround 解释（示例性行业文章）。:contentReference[oaicite:10]{index=10}  
- GGR / NGR 定义与对比（行业解释）。:contentReference[oaicite:11]{index=11}  
- 澳大利亚市场上税费与利润压力实例（媒体报道）。:contentReference[oaicite:12]{index=12}

---

如果你希望我做下一步，我可以：
- 把上述术语压缩成「一页面试速记卡」或「10 条要点回答模板（中英文）」，或
- 根据你申请的具体岗位（Trading、Product、Compliance、Tech）把术语按岗位关联标注并给出面试答案示例。

请告诉我你想要哪种格式（我会直接生成可以复制进 Obsidian 的 Markdown 页面）。  
