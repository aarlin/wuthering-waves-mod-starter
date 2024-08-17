"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.ActorSystemDebugger = void 0);
const UE = require("ue");
class ActorSystemDebugger {
	static RecordGetPut(t) {
		this.L6 && this.D6.push(t);
	}
	static OutPutCsv(t) {
		let e =
			"类名,操作类型,是否命中,时间戳,此类型总数,命中率,池中总量,待销毁数量\n";
		for (const r of this.D6) {
			var s = r.TimeStamp.toString().substring(5);
			e = e.concat(
				`${r.ClassName},${r.GetOrPut},${r.Hit},${s},${r.ThisTypeTotal},${r.HitRate},${r.CurrentTotal},${r.PendingKillNum}\n`,
			);
		}
		t
			? UE.KuroStaticLibrary.SaveStringToFile(e, t)
			: UE.KuroStaticLibrary.SaveStringToFile(e, this.lb);
	}
}
((exports.ActorSystemDebugger = ActorSystemDebugger).lb =
	"f:/full_get_put_actor.csv"),
	(ActorSystemDebugger.L6 = !0),
	(ActorSystemDebugger.D6 = []);
//# sourceMappingURL=ActorSystemDebugger.js.map
