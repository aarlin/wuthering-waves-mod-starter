"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.LevelGeneralContextUtil = void 0);
const Protocol_1 = require("../../Core/Define/Net/Protocol"),
	MathUtils_1 = require("../../Core/Utils/MathUtils"),
	ModelManager_1 = require("../Manager/ModelManager"),
	LevelGeneralContextDefine_1 = require("./LevelGeneralContextDefine");
class LevelGeneralContextUtil {
	static CreateByServerContext(e) {
		if (e) {
			let o;
			switch (e.Xms) {
				case Protocol_1.Aki.Protocol.Pbs.Jms:
					o = LevelGeneralContextUtil.UUe(e.Xms, e.Jms);
					break;
				case Protocol_1.Aki.Protocol.Pbs.zms:
					o = LevelGeneralContextUtil.UUe(e.Xms, e.zms.wCs);
					break;
				case Protocol_1.Aki.Protocol.Pbs.Zms:
					o = LevelGeneralContextUtil.UUe(e.Xms, e.Zms.wCs);
					break;
				case Protocol_1.Aki.Protocol.Pbs.eCs:
					o = LevelGeneralContextUtil.UUe(e.Xms, e.eCs.wCs);
					break;
				case Protocol_1.Aki.Protocol.Pbs.Proto_EntityStateChangeAction:
					o = LevelGeneralContextUtil.UUe(e.Xms, e.tCs.wCs);
					break;
				case Protocol_1.Aki.Protocol.Pbs.iCs:
					o = LevelGeneralContextUtil.UUe(e.Xms, e.iCs.wCs);
					break;
				case Protocol_1.Aki.Protocol.Pbs.rCs:
					o = LevelGeneralContextUtil.UUe(e.Xms, e.rCs.wCs);
					break;
				case Protocol_1.Aki.Protocol.Pbs.Proto_EntityLeaveTrigger:
					o = LevelGeneralContextUtil.UUe(e.Xms, e.oCs.wCs);
					break;
				case Protocol_1.Aki.Protocol.Pbs.nCs:
					o = LevelGeneralContextUtil.UUe(e.Xms, e.nCs.wCs);
					break;
				case Protocol_1.Aki.Protocol.Pbs.sCs:
					o = LevelGeneralContextUtil.UUe(e.Xms, e.sCs.wCs);
					break;
				case Protocol_1.Aki.Protocol.Pbs.fCs:
					o = LevelGeneralContextUtil.UUe(e.Xms, e.fCs.wCs);
					break;
				case Protocol_1.Aki.Protocol.Pbs.aCs:
					o = LevelGeneralContextDefine_1.LevelPlayContext.Create(
						e.aCs.VCs,
						e.Xms,
					);
					break;
				case Protocol_1.Aki.Protocol.Pbs.hCs:
					o = LevelGeneralContextDefine_1.LevelPlayContext.Create(
						e.hCs.VCs,
						e.Xms,
					);
					break;
				case Protocol_1.Aki.Protocol.Pbs.lCs:
					o = LevelGeneralContextDefine_1.QuestContext.Create(e.lCs.Xkn, e.Xms);
					break;
				case Protocol_1.Aki.Protocol.Pbs._Cs:
					o = LevelGeneralContextDefine_1.QuestContext.Create(e._Cs.Xkn, e.Xms);
					break;
				case Protocol_1.Aki.Protocol.Pbs.uCs:
					o = LevelGeneralContextDefine_1.QuestContext.Create(e.uCs.Xkn, e.Xms);
					break;
				case Protocol_1.Aki.Protocol.Pbs.cCs:
					o = LevelGeneralContextUtil.AUe(e.Xms, e.cCs.$Cs);
					break;
				case Protocol_1.Aki.Protocol.Pbs.dCs:
					o = LevelGeneralContextUtil.AUe(e.Xms, e.dCs.$Cs);
					break;
				case Protocol_1.Aki.Protocol.Pbs.gCs:
					o = LevelGeneralContextUtil.AUe(e.Xms, e.gCs.$Cs);
					break;
				case Protocol_1.Aki.Protocol.Pbs.vCs:
					o = LevelGeneralContextUtil.AUe(e.Xms, e.vCs.$Cs);
					break;
				case Protocol_1.Aki.Protocol.Pbs.pCs:
					o = LevelGeneralContextUtil.AUe(e.Xms, e.pCs.$Cs);
					break;
				case Protocol_1.Aki.Protocol.Pbs.MCs:
					o = LevelGeneralContextUtil.AUe(e.Xms, e.MCs.$Cs);
			}
			return o;
		}
	}
	static AUe(e, o) {
		var t = MathUtils_1.MathUtils.LongToBigInt(o.Ykn);
		return LevelGeneralContextDefine_1.GeneralLogicTreeContext.Create(
			Protocol_1.Aki.Protocol.NCs.Proto_BtTypeQuest,
			t,
			o.FCs,
			o.Jkn,
			e,
		);
	}
	static UUe(e, o) {
		return (
			(o = MathUtils_1.MathUtils.LongToNumber(o.Ykn)),
			(o = ModelManager_1.ModelManager.CreatureModel.GetEntity(o)),
			LevelGeneralContextDefine_1.EntityContext.Create(o?.Id, e)
		);
	}
}
exports.LevelGeneralContextUtil = LevelGeneralContextUtil;
