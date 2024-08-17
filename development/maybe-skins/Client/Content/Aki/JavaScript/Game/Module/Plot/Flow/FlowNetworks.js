"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.FlowNetworks = void 0);
const Protocol_1 = require("../../../../Core/Define/Net/Protocol"),
	Net_1 = require("../../../../Core/Net/Net"),
	ControllerHolder_1 = require("../../../Manager/ControllerHolder");
class FlowNetworks {
	static Register() {
		Net_1.Net.Register(13967, this.CXi),
			Net_1.Net.Register(9916, this.gXi),
			Net_1.Net.Register(7476, this.fXi);
	}
	static UnRegister() {
		Net_1.Net.UnRegister(13967),
			Net_1.Net.UnRegister(9916),
			Net_1.Net.UnRegister(7476);
	}
	static RequestGmFinish() {
		var o = Protocol_1.Aki.Protocol.qQn.create();
		(o.Z4n = 0),
			(o.H3n = "@skipflow"),
			Net_1.Net.Call(28935, Protocol_1.Aki.Protocol.qQn.create(o), (o) => {});
	}
	static RequestAction(o, r, e) {
		var l = Protocol_1.Aki.Protocol.eZn.create();
		(l.E8n = o),
			(l.y8n = r),
			Net_1.Net.Call(27547, l, (o) => {
				e && e(), FlowNetworks.pXi(o.Kms, 20061);
			});
	}
	static RequestFlowEnd(o, r, e, l) {
		var t = new Protocol_1.Aki.Protocol.Xzn(),
			n = ((t.E8n = o), (t.I8n = r), {});
		for (const o of e) {
			var i = o[0];
			const r = o[1];
			var s = [];
			for (const o of r) {
				var c = { T8n: o[0], dFn: o[1] };
				s.push(c);
			}
			n[i] = { L8n: s };
		}
		(t.D8n = n),
			Net_1.Net.Call(17995, t, (o) => {
				o
					? (FlowNetworks.pXi(o.Kms, 20061),
						l?.(o.Kms === Protocol_1.Aki.Protocol.lkn.Sys))
					: (ControllerHolder_1.ControllerHolder.FlowController.LogError(
							"请求完成剧情时网络错误",
						),
						l?.(!1));
			});
	}
	static RequestFlowRestart(o) {
		var r = new Protocol_1.Aki.Protocol.zzn();
		(r.E8n = o),
			Net_1.Net.Call(2177, r, (r) => {
				r
					? r.Kms !== Protocol_1.Aki.Protocol.lkn.Sys &&
						ControllerHolder_1.ControllerHolder.FlowController.LogError(
							"请求重启剧情失败",
							["flowIncId", o],
						)
					: ControllerHolder_1.ControllerHolder.FlowController.LogError(
							"请求重启剧情时网络错误",
							["flowIncId", o],
						);
			});
	}
	static pXi(o, r) {
		o === Protocol_1.Aki.Protocol.lkn.Proto_ErrFinishFlowFail
			? ControllerHolder_1.ControllerHolder.FlowController.LogError(
					"请求服务器完成剧情失败",
				)
			: o === Protocol_1.Aki.Protocol.lkn.Proto_ErrFlowActionFail &&
				(ControllerHolder_1.ControllerHolder.FlowController.LogError(
					"请求服务器剧情行为失败",
				),
				ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
					o,
					r,
				));
	}
	static RequestSafeTeleport(o, r) {
		var e = new Protocol_1.Aki.Protocol.g4s();
		(e.E8n = o),
			Net_1.Net.Call(5649, e, (o) => {
				o && o.Kms === Protocol_1.Aki.Protocol.lkn.Sys
					? r(!0)
					: (ControllerHolder_1.ControllerHolder.FlowController.LogError(
							"请求服务器传送到剧情起始点失败",
						),
						r(!1));
			});
	}
}
((exports.FlowNetworks = FlowNetworks).CXi = (o) => {
	ControllerHolder_1.ControllerHolder.FlowController.StartNotify(o);
}),
	(FlowNetworks.gXi = (o) => {
		ControllerHolder_1.ControllerHolder.FlowController.EndNotify(o);
	}),
	(FlowNetworks.fXi = (o) => {
		ControllerHolder_1.ControllerHolder.FlowController.SkipBlackScreenNotify(o);
	});
