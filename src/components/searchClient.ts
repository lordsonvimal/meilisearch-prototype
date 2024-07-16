import { instantMeiliSearch } from "@meilisearch/instant-meilisearch";
import axios, { AxiosHeaders, Method } from "axios";

const attributes = ["release_date", "id", "title", "genres", "overview"];

const meiliSearchParams = {
  attributesToHighlight: ["*"],
  attributesToRetrieve: attributes,
  showRankingScore: true,
  hybrid: {
    embedder: "custom",
    semanticRatio: 1,
  },
};

export function searchClient (url: string, token: string) {
  const { searchClient } =  instantMeiliSearch(url, token, {
    httpClient: async (url, options) => {
      const vector = [-0.3361688554286957, 0.31522563099861145, 0.040045153349637985, -0.1232680231332779, -0.38310152292251587, -0.49100109934806824, -0.3466615080833435, -0.03608352690935135, 0.20429658889770508, -0.5087898373603821, -0.3013034462928772, -0.5799211263656616, -0.29085713624954224, 0.5297198295593262, -0.6390682458877563, 0.5375939607620239, -0.27421069145202637, 0.26791146397590637, 0.5418053269386292, -0.19358061254024506, 0.10155121982097626, 0.12630291283130646, 0.03295295685529709, 0.22152094542980194, -0.2314373403787613, -0.08015792071819305, 0.06540123373270035, -0.29410460591316223, -0.48297303915023804, 0.16805627942085266, -0.032181352376937866, 0.3024437427520752, -0.30171048641204834, -0.10634851455688477, 0.1923556923866272, 0.7829883694648743, -0.02385956607758999, 0.045342713594436646, -0.5680471658706665, 0.5316717624664307, -0.25358840823173523, -0.5535966157913208, 0.2173835188150406, -0.12633278965950012, -0.007560482248663902, -0.07976210117340088, 0.4600886106491089, -0.6858219504356384, 0.1997789740562439, 0.06220486760139465, -0.6718637943267822, -0.2068156749010086, -0.5888036489486694, -0.3644755780696869, -0.03576090931892395, 0.3137182593345642, 0.18614687025547028, -0.6865214109420776, -0.03845261409878731, -0.474961519241333, 0.22853869199752808, 0.1164800152182579, -0.12238354235887527, 0.24205990135669708, 0.7790358066558838, 0.35025444626808167, -0.21514660120010376, -0.13604535162448883, 0.06819622963666916, -0.6403896808624268, -0.07050157338380814, -0.02759149670600891, 0.11884142458438873, -0.16256311535835266, -0.10561872273683548, -0.37331515550613403, -0.1402234584093094, -0.20138436555862427, -0.07255958020687103, -0.5466417074203491, 0.5582920908927917, -0.4194480776786804, -0.2874522805213928, -0.39146947860717773, 0.33135050535202026, 0.16140468418598175, 0.2769235670566559, 0.10361295938491821, -0.006361034698784351, -0.19249486923217773, 0.12897470593452454, -0.5349600911140442, -0.015367351472377777, 0.18820375204086304, 0.2839745581150055, 0.15413889288902283, -0.15723663568496704, -0.033699724823236465, -0.15182870626449585, 0.31518471240997314, 0.14387068152427673, -0.3278765082359314, 0.02469468116760254, -0.17881834506988525, 0.3528047204017639, -0.23751786351203918, 0.19114303588867188, 0.1205795481801033, 0.42594337463378906, 0.40039241313934326, 0.24197284877300262, -0.36903196573257446, -0.06251490116119385, 0.6271372437477112, 0.18832653760910034, 0.21630071103572845, 0.27284133434295654, -0.2442476749420166, -0.3288819193840027, 0.15680459141731262, -0.016710693016648293, -0.22046279907226562, -0.12754493951797485, -0.04395294934511185, 0.12281862646341324, 0.14198076725006104, 0.45901620388031006, -2.2564035772632166e-32, 0.29622557759284973, -0.12214017659425735, 0.136546790599823, -0.22271771728992462, 0.4826200306415558, 0.3310869038105011, -0.0755179226398468, 0.30809664726257324, -0.3416566252708435, -0.04254699870944023, -0.37037932872772217, -0.033422067761421204, -0.1071121022105217, 0.08125147223472595, -0.13257244229316711, 0.34785011410713196, -0.12300900369882584, 0.5986208319664001, 0.2794301211833954, 0.09045389294624329, -0.32767748832702637, 0.2265823781490326, -0.6853672862052917, -0.24683505296707153, 0.09515676647424698, -0.3437228202819824, -0.1489821821451187, -0.1335984766483307, 0.07405130565166473, 0.175034761428833, -0.07231193780899048, -0.07647807896137238, -0.0819670632481575, -0.1289275735616684, 0.6990856528282166, -0.1303100436925888, -0.25768256187438965, -0.13433857262134552, -0.10908079892396927, -0.1435069590806961, 0.020668717101216316, 0.3354836702346802, 0.12002751231193542, -0.07087793946266174, -0.35726648569107056, 0.33148106932640076, 0.7038222551345825, 0.11965101957321167, -0.10576429963111877, 0.40514448285102844, 0.1959332972764969, 0.501193642616272, -0.6378783583641052, 0.07929468899965286, -0.17831629514694214, 0.22518393397331238, 0.1111496239900589, -0.21750372648239136, 0.3097744584083557, -0.40389296412467957, 0.008213484659790993, 0.14901357889175415, 0.0214497409760952, 0.270402193069458, 0.4453418254852295, -0.1882902979850769, 0.24342739582061768, 0.2793918251991272, 0.40244966745376587, 0.06510412693023682, -0.2614203989505768, -0.4958242177963257, 0.30240556597709656, 0.18669050931930542, -0.2237040102481842, 0.18722602725028992, 0.08868969976902008, -0.01961982622742653, -0.7247079014778137, -0.07847556471824646, -0.33153393864631653, 0.09308544546365738, 0.3554694354534149, 0.345459520816803, 0.07478286325931549, 0.30639904737472534, 0.06673884391784668, 0.2058291733264923, 0.19186142086982727, 0.2306623011827469, -0.1691318154335022, -0.1679871380329132, -0.3520732820034027, 0.022319890558719635, -0.034763626754283905, 4.802306948157786e-33, 0.27599892020225525, -0.6573350429534912, -0.3235929012298584, -0.4508377015590668, 0.2527569830417633, -0.049431413412094116, -0.25445806980133057, 0.5706593990325928, -0.029028741642832756, -0.10946743190288544, 0.259054571390152, 0.13605864346027374, 0.4293566346168518, -0.23604510724544525, 0.433297723531723, -0.05241066962480545, -0.14839814603328705, -0.27258017659187317, -0.11826616525650024, 0.690751850605011, 0.3006402552127838, -0.15017393231391907, -0.4229329228401184, 0.11907314509153366, -0.36390331387519836, 0.26363322138786316, 0.5032011866569519, -0.21692265570163727, -0.33537429571151733, -0.3512820303440094, -0.37050819396972656, 0.17163127660751343, -0.04078172892332077, -0.4527617394924164, -0.5814232230186462, 0.28557389974594116, 0.23633509874343872, -0.9595862627029419, -0.2608460783958435, 0.34282493591308594, 0.5090977549552917, 0.33221444487571716, -0.13464002311229706, 0.0568973571062088, 0.24520492553710938, -0.5842820405960083, -0.07592878490686417, 0.3054284155368805, -0.03381786867976189, -0.3398483097553253, -0.19648441672325134, -0.11284185200929642, 0.32458361983299255, -0.408185750246048, 0.12232079356908798, -0.16983190178871155, -0.2612170875072479, 0.2215988039970398, -0.0353565439581871, 0.28879469633102417, -0.33105170726776123, -0.12086987495422363, -0.0038550253957509995, -0.18746373057365417, -0.2602740526199341, 0.25594550371170044, -0.29401031136512756, 0.1595642864704132, -0.6980420351028442, 0.4092951714992523, 0.13328605890274048, -0.12102778255939484, -0.20629297196865082, 0.31330880522727966, 0.1871505081653595, -0.0661703571677208, 0.2675144076347351, -0.006703907623887062, 0.6080657839775085, -0.3600594997406006, -0.2242394983768463, -0.672329843044281, 0.5617373585700989, 0.41571125388145447, 0.18443894386291504, 0.18982891738414764, 0.2742161452770233, 0.10571299493312836, 0.0158417709171772, 0.08863122761249542, 0.21581286191940308, -0.263045996427536, -0.16891495883464813, -0.68239825963974, 0.13709209859371185, -9.668644906923873e-08, 0.07074669003486633, 0.4288226366043091, 0.06536049395799637, -0.41447126865386963, -0.5523708462715149, -0.418729305267334, -0.020679272711277008, 0.29297712445259094, -0.015201959758996964, -0.1251932829618454, -0.6084305644035339, -0.03639194741845131, 0.25337859988212585, 0.41457483172416687, -0.29904818534851074, 0.18873418867588043, 0.3576631247997284, 0.0719369575381279, -0.1987348049879074, 0.0019621998071670532, 0.21181116998195648, -0.45756107568740845, 0.7074617743492126, 0.1589333713054657, 0.0722450315952301, 0.18004964292049408, -0.18813203275203705, -0.1883862465620041, 0.46268802881240845, 0.3307265341281891, 0.044334910809993744, 0.23690617084503174, -0.02857135608792305, 0.18507909774780273, 0.3874166011810303, 0.047979362308979034, 0.19823773205280304, -0.22782278060913086, -0.07930964976549149, -0.5572240352630615, -0.06938982009887695, -0.04211876541376114, 0.2697462737560272, 0.13097193837165833, 0.4540634751319885, 0.3587178885936737, 0.6277066469192505, -0.26704367995262146, 0.21640612185001373, 0.13662104308605194, 0.3454382121562958, 0.1014542207121849, 0.17703844606876373, -0.05024366080760956, 0.19173863530158997, -0.03825414925813675, 0.30362918972969055, -0.22362743318080902, -0.5948521494865417, 0.01701301336288452, 0.676985502243042, -0.3036072254180908, -0.14138108491897583, -0.1468525379896164];
      const data = typeof options?.body === "string" ? JSON.parse(options.body) : {};
      if (Array.isArray(data.queries)) {
        data.queries.forEach(query => {
          query.vector = vector;
          // query.filter = "_rankingScore > 0.2";
          Object.keys(meiliSearchParams).forEach(key => {
            query[key] = meiliSearchParams[key];
          })
        });
      }

      const response = await axios.request({
        data: JSON.stringify(data),
        headers: options?.headers as AxiosHeaders,
        method: options?.method?.toLocaleUpperCase() as Method ?? "GET",
        url
      });
      return response.data;
    },
    primaryKey: "id",
    finitePagination: true,
    keepZeroFacets: true,
    meiliSearchParams
  });

  return searchClient;
}
