"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.PersonalController = void 0);
const Protocol_1 = require("../../../../Core/Define/Net/Protocol"),
	Net_1 = require("../../../../Core/Net/Net"),
	ControllerHolder_1 = require("../../../Manager/ControllerHolder"),
	ModelManager_1 = require("../../../Manager/ModelManager"),
	UiControllerBase_1 = require("../../../Ui/Base/UiControllerBase"),
	ScrollingTipsController_1 = require("../../ScrollingTips/ScrollingTipsController");
class PersonalController extends UiControllerBase_1.UiControllerBase {
	static SendBirthdayInitRequest(o) {
		var e = Protocol_1.Aki.Protocol.MWn.create();
		(e._5n = o),
			Net_1.Net.Call(7998, e, (e) => {
				e &&
					(e.lkn === Protocol_1.Aki.Protocol.lkn.Sys
						? ModelManager_1.ModelManager.PersonalModel.SetBirthday(o)
						: ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
								e.lkn,
								19017,
							));
			});
	}
	static SendBirthdayShowSetRequest(o) {
		var e = Protocol_1.Aki.Protocol.UWn.create();
		(e.a8n = o),
			Net_1.Net.Call(10008, e, (e) => {
				e &&
					(e.lkn === Protocol_1.Aki.Protocol.lkn.Sys
						? ModelManager_1.ModelManager.PersonalModel.SetBirthdayDisplay(o)
						: ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
								e.lkn,
								10702,
							));
			});
	}
	static SendRoleShowListUpdateRequest(o) {
		var e = Protocol_1.Aki.Protocol.EWn.create();
		(e.h8n = o),
			Net_1.Net.Call(13799, e, (e) => {
				e &&
					(e.lkn === Protocol_1.Aki.Protocol.lkn.Sys
						? ModelManager_1.ModelManager.PersonalModel.UpdateRoleShowList(o)
						: ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
								e.lkn,
								27349,
							));
			});
	}
	static SendChangeCardRequest(o) {
		var e = Protocol_1.Aki.Protocol.LWn.create();
		(e.l8n = o),
			Net_1.Net.Call(27663, e, (e) => {
				e &&
					(e.lkn === Protocol_1.Aki.Protocol.lkn.Sys
						? ModelManager_1.ModelManager.PersonalModel.SetCurCardId(o)
						: ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
								e.lkn,
								25891,
							));
			});
	}
	static SendReadCardRequest(o) {
		var e = Protocol_1.Aki.Protocol.DWn.create();
		(e.l8n = o),
			Net_1.Net.Call(25600, e, (e) => {
				e &&
					(e.lkn === Protocol_1.Aki.Protocol.lkn.Sys
						? ModelManager_1.ModelManager.PersonalModel.UpdateCardUnlockList(
								o,
								!0,
							)
						: ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
								e.lkn,
								15839,
							));
			});
	}
	static SendModifySignatureRequest(o) {
		var e = Protocol_1.Aki.Protocol._Wn.create();
		(e.l5n = o),
			Net_1.Net.Call(14276, e, (e) => {
				e &&
					(e.lkn === Protocol_1.Aki.Protocol.lkn.Sys
						? ModelManager_1.ModelManager.PersonalModel.SetSignature(o)
						: e.lkn === Protocol_1.Aki.Protocol.lkn.Proto_ContainsDirtyWord ||
								e.lkn ===
									Protocol_1.Aki.Protocol.lkn.Proto_ErrRoleInvalidNameLength
							? ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
									"NotElegantName",
								)
							: ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
									e.lkn,
									21259,
								));
			});
	}
	static SendChangeHeadPhotoRequest(o) {
		var e = Protocol_1.Aki.Protocol.cWn.create();
		(e._8n = o),
			Net_1.Net.Call(28199, e, (e) => {
				e &&
					(e.lkn === Protocol_1.Aki.Protocol.lkn.Sys
						? ModelManager_1.ModelManager.PersonalModel.SetHeadPhotoId(o)
						: ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
								e.lkn,
								19761,
							));
			});
	}
	static CheckCardIsUsing(o) {
		var e = ModelManager_1.ModelManager.PersonalModel.GetCardShowList(),
			r = e.length;
		let l = !1;
		for (let t = 0; t < r; t++)
			if (e[t] === o) {
				l = !0;
				break;
			}
		return l;
	}
	static CheckCardIsUnLock(o) {
		var e = ModelManager_1.ModelManager.PersonalModel.GetCardUnlockList(),
			r = e.length;
		let l = !1;
		for (let t = 0; t < r; t++)
			if (e[t].CardId === o) {
				l = !0;
				break;
			}
		return l;
	}
	static OnRegisterNetEvent() {
		Net_1.Net.Register(26689, (o) => {
			ModelManager_1.ModelManager.PersonalModel.AddCardUnlockList(o.l8n, !1);
		}),
			Net_1.Net.Register(5089, (o) => {
				ModelManager_1.ModelManager.PersonalModel.SetHeadPhotoId(o.$gs);
			}),
			Net_1.Net.Register(20767, (o) => {
				ModelManager_1.ModelManager.PersonalModel.SetRoleShowList(o.Ygs);
			}),
			Net_1.Net.Register(4725, (o) => {
				ModelManager_1.ModelManager.PersonalModel.SetSignature(o.l5n);
			});
	}
	static OnUnRegisterNetEvent() {
		Net_1.Net.UnRegister(26689);
	}
}
(exports.PersonalController = PersonalController),
	((_a = PersonalController).RequestModifySignature = async (o) => {
		var e;
		return (
			(e =
				(((e = Protocol_1.Aki.Protocol._Wn.create()).l5n = o),
				await Net_1.Net.CallAsync(14276, e))).lkn ===
			Protocol_1.Aki.Protocol.lkn.Sys
				? ModelManager_1.ModelManager.PersonalModel.SetSignature(o)
				: e.lkn === Protocol_1.Aki.Protocol.lkn.Proto_ContainsDirtyWord ||
						e.lkn === Protocol_1.Aki.Protocol.lkn.Proto_ErrRoleInvalidNameLength
					? ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
							"NotElegantName",
						)
					: ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
							e.lkn,
							21259,
						),
			e.lkn
		);
	}),
	(PersonalController.RequestModifyName = async (o) => {
		var e;
		return (
			(e =
				(((e = Protocol_1.Aki.Protocol.hWn.create()).e4n = o),
				await Net_1.Net.CallAsync(15982, e))).lkn ===
			Protocol_1.Aki.Protocol.lkn.Sys
				? ModelManager_1.ModelManager.FunctionModel.SetPlayerName(o)
				: e.lkn === Protocol_1.Aki.Protocol.lkn.Proto_ContainsDirtyWord ||
						e.lkn === Protocol_1.Aki.Protocol.lkn.Proto_ErrRoleInvalidNameLength
					? ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
							"NotElegantName",
						)
					: ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
							e.lkn,
							19761,
						),
			e.lkn
		);
	});
